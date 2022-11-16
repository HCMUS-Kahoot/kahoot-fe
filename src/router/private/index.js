import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from 'antd'
import Home from '../../pages/Home'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
const { Content } = Layout;

function PrivateRouter() {
  return (
    <Layout>
      <Header />
      <Content className="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Content>
      <Footer />
    </Layout>
  );
}

export default PrivateRouter
