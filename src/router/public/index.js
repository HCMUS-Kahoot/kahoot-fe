import React from 'react'
import {
  Route, Routes,
} from 'react-router-dom'
import { Layout } from 'antd'
import Home from '../../pages/Home'
import Login from '../../pages/Login'
import Register from '../../pages/Register'
import Profile from '../../pages/profile'
import GroupList from '../../pages/GroupList'
import GroupDetail from '../../pages/GroupDetail'
const { Content } = Layout;

function PublicRouter() {
  return (
    <Layout>
      <Content className="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/groups" element={<GroupList />} />
          <Route exact path="/groups/:id" element={<GroupDetail />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default PublicRouter;
