import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import "antd/dist/antd.min.css";
import { FacebookFilled, GoogleOutlined } from "@ant-design/icons";
import authApi from "../../api/authAPI";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  const handleSubmit = async () => {
    try {
      await authApi.loginUser(formData, dispatch, navigate);
    } catch (error) {
      console.log("Login error", error);
    }
  };
  const handleTest = async () => {
    await authApi.protectedTest();
  };

  //disble scroll on body
  document.body.style.overflow = "hidden";

  return (
    <>
      <div className="login bg-gray-100 w-full h-full overflow-hidden">
        <div className="header text-center">
          <div className="space p-5 pt-32 bg-gray-100" />
        </div>
        <div className="decorate absolute bg-gray-200 right-[1200px] w-[560px] h-[560px] -rotate-12 z-10 " />

        <div className="login w-full bg-red justify-center flex z-20">
          <div className="login container w-80 h-[490px] text-center justify-center items-center text-lg bg-white p-5 rounded-md shadow-lg">
            <h1 className="text-3xl font-bold">Login</h1>
            <Form
              name="basic"
              layout="vertical"
              initialValues={{
                remember: true,
              }}
              validationschema={schema}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" onClick={handleSubmit}>
                  Login
                </Button>
              </Form.Item>
            </Form>
            <Button type="primary" htmlType="submit" onClick={handleTest}>
              Test protected link
            </Button>
            <div className="my-7" />

            <h1>Or login with</h1>
            <Button
              type="danger"
              shape="round"
              size="large"
              className="mx-1"
              href="http://localhost:5000/api/auth/google/login"
            >
              <GoogleOutlined className="relative bottom-[3px]" /> Google
            </Button>

            <Button
              type="primary"
              shape="round"
              icon={<FacebookFilled className="relative bottom-[3px]" />}
              size="large"
              className="mx-1"
            >
              Facebook
            </Button>
            <div className="my-12" />
            <Link to="/register" className="text-blue-500 underline mx-2">
              Register
            </Link>
            <Link
              to="/forgot-password"
              className="text-blue-500 underline mx-2"
            >
              Forgot Password
            </Link>
          </div>
        </div>
        <div className="decorate absolute bg-gray-200 right-1 w-72 h-96 rotate-45 z-10 " />

        <div className="bg-gray-100 pb-96"></div>
      </div>
    </>
  );
}
