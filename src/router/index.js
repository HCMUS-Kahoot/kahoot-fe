import React from "react";
import PrivateRouter from "./private";
import PublicRouter from "./public";

function Routes({ user }) {
  return user ? <PrivateRouter /> : <PublicRouter />;
}

export default Routes;
