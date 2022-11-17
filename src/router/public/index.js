import React from 'react'
import {
  Route, Routes,
} from 'react-router-dom'
import { Layout } from 'antd'
import Home from '../../pages/Home'
import Login from '../../pages/Login'
import Register from '../../pages/Register'
import Profile from '../../pages/profile'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
const { Content } = Layout;

function PublicRouter() {
  return (
    <Layout>
      <Header />
      <Content className="content w-11/12 self-center mt-2">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </Content>
      <Footer/>
    </Layout>
  );
}

export default PublicRouter;
