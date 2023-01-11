import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import PrivateRouter from "./private";
import PublicRouter from "./public";

function Routes({ user }) {
  const prevLocation = useLocation();
  console.log("This is prevLocation: ", prevLocation)
  console.log("This is pathname window", window.location)
  return user ? <PrivateRouter /> : <PublicRouter returnUrl={prevLocation.pathname} />;
}

export default Routes;
