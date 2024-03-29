import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Invitation from "../../pages/Invitation";
import RedirectPage from '../../pages/RedirectPage'
import PresentationEdit from "../../pages/presentation/presentationEdit";
import EmailInput from "../../pages/forgotpassword/emailInput";
import ResetPasword from "../../pages/forgotpassword/resetpassword";
import Activation from "../../pages/ActiveByEmail";
const { Content } = Layout;

function PublicRouter({ returnUrl }) {
  console.log("return url in public router: ", returnUrl)
  return (
    <Layout>
      <Header />
      <Content className="content w-11/12 self-center mt-2">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          {/* <Route exact path="/groups/:id/invitation" element={<Invitation />} /> */}
          <Route exact path="/redirectPage/:accessToken/:refreshToken" element={<RedirectPage />} />
          <Route exact path="/presentation/:id" element={<PresentationEdit />} />
          <Route exact path="/forgotpassword" element={<EmailInput />} />
          <Route exact path="/forgotpassword/resetpassword" element={<ResetPasword />} />
          <Route path="/activeByEmail/:token" element={<Activation />} />
          <Route path="*" element={<Navigate replace to={`/login?returnUrl=${returnUrl}`} />} />
        </Routes>
      </Content>
      <Footer />
    </Layout>
  );
}

export default PublicRouter;
