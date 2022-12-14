import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import Home from "../../pages/Home";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Profile from "../../pages/profile";
import GroupList from "../../pages/GroupList";
import GroupDetail from "../../pages/GroupDetail";
import HelloUser from "../../pages/helloUser";
import Invitation from "../../pages/Invitation";
import PresentationEdit from "../../pages/presentation/presentationEdit";
import PresentationList from "../../pages/presentationList";
import PresentationShow from "../../pages/presentation/presentationShow";
import PresentationChoose from "../../pages/presentation/presentationChoose";
import PresentationPinInput from "../../pages/presentation/presentationPinInput";
import EmailInput from "../../pages/forgotpassword/emailInput";
import ResetPasword from "../../pages/forgotpassword/resetpassword";
import Activation from "../../pages/ActiveByEmail";
const { Content } = Layout;

function PrivateRouter() {
  return (
    <Layout>
      <Header />
      <Content className="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/groups" element={<GroupList tab="myGroup" />} />
          <Route exact path="/groups/admin" element={<GroupList tab="groupImAdmin" />} />
          <Route exact path="/groups/co-owner" element={<GroupList tab="groupImCoOwner" />} />
          <Route exact path="/groups/member" element={<GroupList tab="groupImIn" />} />
          <Route exact path="/groups/:id" element={<GroupDetail />} />
          <Route exact path="/groups/:id/invitation" element={<Invitation />} />
          <Route exact path="/groups/:id/posts" element={<GroupDetail tab='posts' />} />
          <Route exact path="/hello" element={<HelloUser />} />
          <Route
            exact
            path="/hello/yes"
            element={<HelloUser activated={true} />}
          />
          <Route exact path="/presentations" element={<PresentationList />} />
          <Route exact path="/presentations/:id" element={<PresentationEdit />} />
          <Route exact path="/presentations/:id/show" element={<PresentationShow />} />
          <Route exact path="/presentations/:id/choose" element={<PresentationChoose />} />
          <Route exact path="/presentations/pin" element={<PresentationPinInput />} />
          <Route exact path="/forgotpassword" element={<EmailInput />} />
          <Route exact path="/forgotpassword/resetpassword" element={<ResetPasword />} />
          <Route path="/activeByEmail/:token" element={<Activation />} />
        </Routes>
      </Content>
      <Footer />
    </Layout>
  );
}

export default PrivateRouter;
