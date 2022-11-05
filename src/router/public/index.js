import React from 'react'
import {
  Route, Routes,
} from 'react-router-dom'
import { Layout } from 'antd'
import Home from '../../pages/Home'

const { Content } = Layout;

function PublicRouter() {
  return (
    <Layout>
      <Content className="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default PublicRouter;
