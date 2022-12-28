import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
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

export default function Activation() {

    const [formData, setFormData] = useState({
        code: "",
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
            //TODO
            //await authApi.forgotPassword(formData, dispatch, navigate);
            message.success("Successfully activated, please login");
            navigate("/login");
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
                    <div className="login container w-[500px] h-[240px] text-center justify-center items-center text-lg bg-white p-5 rounded-md shadow-lg">
                        <h1 className="text-3xl font-bold">Your activation code: </h1>
                        <Form
                            name="basic"
                            layout="vertical"
                            initialValues={{
                                remember: true,
                            }}
                            validationschema={schema}
                        >
                            <Form.Item
                                label="Code"
                                name="code"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your code!",
                                    },
                                ]}
                            >
                                <Input
                                    name="code"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>

                        <div className="my-7" />
                        <div className="my-12" />
                    </div>
                </div>
                <div className="decorate absolute bg-gray-200 right-1 w-72 h-96 rotate-45 z-10 " />

                <div className="bg-gray-100 pb-96"></div>
            </div>
        </>
    );
}
