import axios from "axios";
import * as Qs from "qs";

let axiosClient;
axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
  paramsSerializer: (params) => Qs.stringify(params),
});

// This request interceptor will add the cookies to the request header
let refreshHandle = axios.create();
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};
axiosClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
axiosClient.interceptors.response.use(
  (resp) => {
    if (resp.headers["access-token"]) {
      localStorage.setItem("accessToken", resp.headers["access-token"]);
    }
    if (resp.headers["refresh-token"]) {
      localStorage.setItem("refreshToken", resp.headers["refresh-token"]);
    }
    if (resp && resp.data) {
      return resp.data;
    }
    return resp;
  },
  async (error) => {
    const originalRequest = error.config;

    // eslint-disable-next-line no-underscore-dangle
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosClient(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      // eslint-disable-next-line no-underscore-dangle
      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        const refreshToken = localStorage.getItem("refreshToken");
        refreshHandle = axios.create({
          baseURL: process.env.REACT_APP_API_URL,
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
          withCredentials: true,
        });
        refreshHandle
          .post(
            `${process.env.REACT_APP_API_URL}/auth/refresh`,
            {},
            { withCredentials: true }
          )
          .then(({ headers }) => {
            localStorage.setItem("accessToken", headers["access-token"]);
            processQueue(null, headers["access-token"]);
            resolve(axiosClient(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);
export default axiosClient;
