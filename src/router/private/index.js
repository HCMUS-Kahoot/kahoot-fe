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

const { Content } = Layout;

function PrivateRouter() {
  return (
    <Layout>
      <Header />
      <Content className="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/groups" element={<GroupList />} />
          <Route exact path="/groups/:id" element={<GroupDetail />} />
          <Route exact path="/groups/:id/posts" element={<GroupDetail tab='posts' />} />
          <Route exact path="/hello" element={<HelloUser />} />
          <Route
            exact
            path="/hello/yes"
            element={<HelloUser activated={true} />}
          />
        </Routes>
      </Content>
      <Footer />
    </Layout>
  );
}

export default PrivateRouter;
