import React, { useEffect } from "react";
import { Form, Input, Button, Avatar, message, Upload, } from "antd";
import { useSelector } from 'react-redux';
import profileApi from "../../api/profileAPI";
import * as Yup from "yup";
import "antd/dist/antd.min.css";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import authApi from "../../api/authAPI";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Profile() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const userid = user?._id || user?.id;
  const navigate = useNavigate();
  const [profile, setProfile] = React.useState({});
  const [loaded, setLoaded] = React.useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await profileApi.getProfileByUser(userid);
        setProfile(res);
        setLoaded(true);
      } catch (error) {
        console.log("Get profile error", error);
        setLoaded(true);
      }
    };
    fetchProfile();
  }, [userid]);

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

  const handleSubmit = async (data) => {
    console.log(data);
    try {
      const res = await profileApi.updateOrCreateByUserId(userid, data);
      console.log(res);
      if (res) {
        message.success("Update profile successfully");
        navigate("/profile");
      }
      else {
        message.error("Update profile failed");
      }

    } catch (error) {
      console.log("Update profile error", error);
    }
  }

  const handleActivateAccount = async () => {
    try{
      const res = await authApi.activateEmail();
      message.success("Please check your mail box for an activate email");
    }catch(error){
      console.log("Send activate email fail: ", error);
    }
  }

  document.body.style.overflow = "hidden";
  if (loaded) {
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
              {
                !user.isActivated &&
                <div>
                  <Button className="mb-5 items-center" onClick={handleActivateAccount}>
                      Activate account by email now
                  </Button>
                </div>
              }
              <Upload {...props}>
                <Avatar size={64} icon={<UserOutlined />} />
              </Upload>
              <Form
                name="basic"
                layout="vertical"
                onFinish={async (data) => {
                  await handleSubmit(data);
                }}
                initialValues={{
                  remember: true,
                }}
                validationschema={schema}
              >
                <Form.Item
                  label="Username"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                  initialValue={profile?.name}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Organization" name="organization" initialValue={profile?.organization}>
                  <Input />
                </Form.Item>
                <Form.Item label="Workplace" name="workplace" initialValue={profile?.workplace}>
                  <Input />
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
}
