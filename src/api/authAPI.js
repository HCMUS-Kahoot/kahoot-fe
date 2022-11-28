import axiosClient from "./axiosClient";
class AuthApi {
  loginUser = async (user) => {
    try {
      const res = await axiosClient.post("api/auth/local/signin", user)
      console.log(res)
    } catch (error) {
      return error
    }
  }
  registerUser = async (user) => {
    try {
      const res = await axiosClient.post("api/auth/local/signup", {...user})
      console.log(res)
    } catch (error) {
      console.log("Register error", error)
      return error;
    }
  }
}
const authApi=new AuthApi();
export default authApi;