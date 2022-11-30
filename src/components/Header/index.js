import { UserOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Image, Layout, Row, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./header.css";
const createItemOptions = [
  {
    key: "1",
    label: (
      <div className="flex bg-[F2F2F2] w-60 justify-between items-center">
        <Image
          src={require("../../assets/images/Kahoot.png")}
          preview={false}
        />
        <Button>Kahoot</Button>
      </div>
    ),
  },
  {
    key: "2",
    label: (
      <div className="flex bg-[F2F2F2] w-60 justify-between items-center">
        <Image
          src={require("../../assets/images/Kahoot.png")}
          preview={false}
        />
        <Button>Group</Button>
      </div>
    ),
  },
];
const profileOption = [
  {
    key: "1",
    label: (
      <div>
        <p>Profile setting</p>
      </div>
    ),
  },
  {
    key: "2",
    label: (
      <div>
        <p className="text-color-red">Logout</p>
      </div>
    ),
  },
];
function Header() {
  return (
    <Layout.Header className="color-white bg-white">
      <Row justify="space-between" align="middle" className="bg-white h-full">
        <Col className="h-full">
          <Row className="h-full">
            <Col className="h-full flex">
              <Link to="\" className="w-20 pt-2">
                <Image
                  src={require("../../assets/images/Kahoot-Logo.png")}
                  preview={false}
                  className="self-center"
                />
              </Link>
            </Col>
            <Col className="h-full">
              <Navbar />
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
                  items: createItemOptions,
                }}
                placement="bottomRight"
              >
                <Button className="mr-4" type="primary" size="large">
                  Create
                </Button>
              </Dropdown>
            </Space>
          </Space>
          <Space direction="vertical">
            <Space wrap>
              <Dropdown
                menu={{
                  items: profileOption,
                }}
                placement="bottomRight"
              >
                <Button
                  shape="circle"
                  icon={<UserOutlined />}
                  className="mr-4"
                  size="large"
                />
              </Dropdown>
            </Space>
          </Space>
        </Col>
      </Row>
    </Layout.Header>
  );
}
export default Header;
