import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./router";
import { useDispatch, useSelector } from "react-redux";
import authApi from "./api/authAPI";
import { loginSucess } from "./store/auth";
import { Provider as RealtimeProvider } from "./store/context/realtimeContext";


let first = true;
function App() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("User change : ", first, user);
    if (user === null || first) {
      const getUser = async () => {
        try {
          await authApi.getCurrentUser(dispatch);
        } catch (error) {
          console.log("Get current user error", error);
          dispatch(loginSucess(null));
        }
      };
      first = false;
      getUser(dispatch);
    }
  }, [user]);

  return (
    <RealtimeProvider>
      <BrowserRouter>
        <Routes user={user} />
      </BrowserRouter>
    </RealtimeProvider>
  );
}
export default App;
