import React, { useEffect, useRef } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./router";
import { useDispatch, useSelector } from "react-redux";
import authApi from "./api/authAPI";
import { loginSucess } from "./store/auth";
import { Provider as RealtimeProvider } from "./store/context/realtimeContext";



function App() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const first = useRef(true);
  useEffect(() => {
    console.log("User change : ", first.current, user);
    if (user === null || first.current) {
      const getUser = async () => {
        try {
          await authApi.getCurrentUser(dispatch);
        } catch (error) {
          console.log("Get current user error", error);
          dispatch(loginSucess(null));
        }
      };
      first.current = false;
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
