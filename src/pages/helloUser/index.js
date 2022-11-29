import React from "react";
import { Form, Input, Button, Avatar, message, Upload, Select } from "antd";
import * as Yup from "yup";
import 'antd/dist/antd.min.css';
import { UserOutlined } from "@ant-design/icons";
const schema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string().required("Password is required"),
});

export default function HelloUser({ activated }) {

    document.body.style.overflow = "hidden";

    return (
        <>
            <div className="login bg-gray-100 w-full h-full overflow-hidden">
                <div className="header text-center">
                    <div className="space p-5 pt-24 bg-gray-100" />
                </div>
                <div className="decorate absolute bg-gray-200 right-[1200px] w-[560px] h-[560px] -rotate-12 z-10 " />

                <div className="login w-full bg-red justify-center flex z-20" >
                    <div className="login container w-[600px] h-[140px] text-center justify-center items-center text-lg bg-white p-5 rounded-md shadow-lg">
                        <h1 className="text-3xl font-bold">-Welcome- </h1>
                        {activated ? <h2> Your account is now successfully activated </h2> : <h2> Your account is not activated yet </h2>}

                    </div>
                </div>
                <div className="decorate absolute bg-gray-200 right-1 w-72 h-96 rotate-30 z-10 rounded-full " />

                <div className="bg-gray-100 pb-96"></div>
            </div>
        </>
    )
}
