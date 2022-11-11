import { Button, Col, Dropdown, Image, Layout, Row, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./header.css";
const items = [
  {
    key: '1',
    label: (
      <div className="flex bg-[F2F2F2] w-80 jutify-around">
        <Image src=""/>
        <Button>Kahoot</Button>
      </div>
    ),
  },
  {
    key: '2',
    label: (
      <div className="flex bg-[F2F2F2] w-80 jutify-around">
        <Image src=""/>
        <Button>Group</Button>
      </div>
    ),
  },
];
function Header(){
  return(<Layout.Header className="color-white">
    <Row justify="space-between" align="middle" className="bg-white h-full">
      <Col className="h-full">
        <Row className="h-full">
          <Col className="h-full">
            <Link><p>Kahoot</p></Link>
          </Col>
          <Col className="h-full">
            <Navbar/>
          </Col>
        </Row>
      </Col>
      <Col className="h-full flex items-center">
        <Button className="mr-4" size="large">
          <Link>
          <p className="font-bold">Share</p>
          </Link>
        </Button>
          <Space direction="vertical">
            <Space wrap>
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottomRight">
                <Button className="mr-4" type="primary" size="large">
                  Create
                </Button>
              </Dropdown>
            </Space>
          </Space>
      </Col>
    </Row>
  </Layout.Header>)
}
export default Header;