import React from "react";
import { Form, Input, Button, Avatar, message, Upload, Select } from "antd";
import * as Yup from "yup";
import "antd/dist/antd.min.css";
import { UserOutlined } from "@ant-design/icons";
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Profile() {
  const props = {
    beforeUpload: (file) => {
      const isPNG = file.type === "image/png";
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };

  function handleSubmit(data) {
    console.tron.log(data);
  }
  document.body.style.overflow = "hidden";

  return (
    <>
      <div className="login bg-gray-100 w-full h-full overflow-hidden">
        <div className="header text-center">
          <div className="space p-5 pt-24 bg-gray-100" />
        </div>
        <div className="decorate absolute bg-gray-200 right-[1200px] w-[560px] h-[560px] -rotate-12 z-10 " />

        <div className="login w-full bg-red justify-center flex z-20">
          <div className="login container w-80 h-[560px] text-center justify-center items-center text-lg bg-white p-5 rounded-md shadow-lg">
            <h1 className="text-3xl font-bold">Profile</h1>
            <Upload {...props}>
              <Avatar size={64} icon={<UserOutlined />} />
            </Upload>
            <Form
              name="basic"
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{
                remember: true,
              }}
              validationschema={schema}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
                initialValue="user7976"
              >
                <Input />
              </Form.Item>
              <Form.Item label="Organization" name="organization">
                <Input />
              </Form.Item>
              <Form.Item label="Workplace" name="workplace">
                <Input />
              </Form.Item>
              <Form.Item label="Type" name="type">
                <Select defaultValue="Student">
                  <Select.Option value="Student">Student</Select.Option>
                  <Select.Option value="Teacher">Teacher</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="decorate absolute bg-gray-200 right-1 w-72 h-96 rotate-45 z-10 " />

        <div className="bg-gray-100 pb-96"></div>
      </div>
    </>
  );
}