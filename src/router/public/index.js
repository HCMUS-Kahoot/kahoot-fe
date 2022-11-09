import React from 'react'
import {
  Route, Routes,
} from 'react-router-dom'
import { Layout } from 'antd'
import Home from '../../pages/Home'
import Login from '../../pages/Login'
import Register from '../../pages/Register'
const { Content } = Layout;

function PublicRouter() {
  return (
    <Layout>
      <Content className="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />

        </Routes>
      </Content>
    </Layout>
  );
}

export default PublicRouter;
