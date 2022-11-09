import React from 'react'
import {
  Route, Routes,
} from 'react-router-dom'
import { Layout } from 'antd'
import Home from '../../pages/Home'
import Login from '../../pages/Login'
import Register from '../../pages/Register'
import Profile from '../../pages/profile'
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

        </Routes>
      </Content>
    </Layout>
  );
}

export default PublicRouter;
