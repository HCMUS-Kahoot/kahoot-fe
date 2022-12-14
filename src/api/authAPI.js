import axiosClient from "./axiosClient";
import { loginFailed, loginStart, loginSucess, logOutFailed, logOutStart, logOutSucess } from "../store/auth";
class AuthApi {
  loginUser = async (user, dispatch, navigate, returnUrl) => {
    dispatch(loginStart());
    try {
      const res = await axiosClient.post("/auth/local/signin", user);
      console.log("res from get current user, ", res);
      if (res.email) {
        await dispatch(loginSucess(res));
        navigate(`${returnUrl || "/"}`);
      } else {
        dispatch(loginFailed(res));
      }
    } catch (error) {
      dispatch(loginFailed());
    }
  };
  getCurrentUser = async (dispatch) => {
    try {
      const res = await axiosClient.get("/auth/current-user");
      console.log("res from get current user, ", res);
      if (res.email) {
        await dispatch(loginSucess(res));
      } else {
        dispatch(loginFailed(res));
      }
    } catch (error) {
      dispatch(loginFailed());
    }
  };
  registerUser = async (user) => {
    try {
      const res = await axiosClient.post("/auth/local/signup", user);
      console.log(res);
    } catch (error) {
      console.log("Register error", error);
      return error;
    }
  };
  logout = async (dispatch, navigate) => {
    dispatch(logOutStart())
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(logOutSucess())
    } catch (error) {
      dispatch(logOutFailed())
      return error;
    }
  };
  loginWithGoogle = async () => {
    try {
      const res = await axiosClient.get("/auth/google/login");
      console.log(res);
    } catch (error) {
      console.log("Register error", error);
      return error;
    }
  };
  activateEmail = async () => {
    try{
      await axiosClient.get("/auth/sendActivateEmail")
    } catch(error) {
      console.log("Reset password fail ", error)
      return error;
    }
  }
}
const authApi = new AuthApi();
export default authApi;
