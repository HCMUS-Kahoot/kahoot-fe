import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
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

export default function Register() {
  //disble scroll on body
  document.body.style.overflow = "hidden";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  function handleChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  const handleSubmit = async () => {
    await authApi.registerUser(formData);
  };

  return (
    <>
      <div className="login bg-gray-100 w-full h-full">
        <div className="header text-center">
          <div className="space bg-gray-100" />
        </div>

        <div className="login w-full bg-red justify-center flex z-20">
          <div className="login container w-80 h-[570px] text-center justify-center items-center text-lg bg-white p-5 rounded-md shadow-lg">
            <h1 className="text-3xl font-bold">Register</h1>
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
                  {
                    type: "email",
                    message: "Please input a valid email!",
                  },
                ]}
              >
                <Input
                  value={formData.email}
                  name="email"
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
                  { min: 8, message: "Password must be at least 8 characters" },
                  // {
                  //   validator: (_, value) => {
                  //     //must contain at least one uppercase letter
                  //     if (!value || /[A-Z]/.test(value)) {
                  //       return Promise.resolve();
                  //     }
                  //     return Promise.reject(
                  //       new Error("Password must contain at least one uppercase letter")
                  //     );
                  //   }
                  // }
                ]}
              >
                <Input.Password
                  value={formData.password}
                  name="password"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                label="Retype Password"
                name="retype-password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    validator: (_, value) => {
                      if (!value || formData.password === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords that you entered do not match!")
                      );
                    },
                  }
                ]}
              >
                <Input.Password
                  value={formData.confirmPassword}
                  name="confirmPassword"
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please input your firstName!",
                  },
                  { min: 6, message: "First name must be at least 6 characters" }
                ]}
              >
                <Input
                  value={formData.firstName}
                  name="firstName"
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please input your lastName!",
                  },
                  { min: 6, message: "Last name must be at least 6 characters"}
                ]}
              >
                <Input
                  value={formData.lastName}
                  name="lastName"
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                  Register
                </Button>
              </Form.Item>
            </Form>
            <div className="my-7" />

            <h1>Or login with</h1>
            <Button
              type="danger"
              shape="round"
              size="large"
              className="mx-1"
              href={`${process.env.REACT_APP_API_URL}/auth/google/login`}
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
            <Link to="/login" className="text-blue-500 underline mx-2">
              Login
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
