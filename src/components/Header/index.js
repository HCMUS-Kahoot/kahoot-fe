import { UserOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Image, Layout, Row, Space, message } from "antd";
import { useSelector } from 'react-redux';
import authApi from "../../api/authAPI";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./header.css";
import { useDispatch } from "react-redux";
import profileApi from "../../api/profileAPI";
import presentationApi from "../../api/presentationAPI";
import groupApi from "../../api/groupAPI";

const profileOption = (handleLogout, handleProfile) => {
  return [
    {
      key: "1",
      label: (
        <div onClick={handleProfile}>
          <p>Profile setting</p>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div onClick={handleLogout}>
          <p className="text-color-red">Logout</p>
        </div>
      ),
    },
  ];
}

function Header() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const userid = user?._id || user?.id;
  console.log("userid", userid);
  const [profile, setProfile] = React.useState({});
  const [loaded, setLoaded] = React.useState(false);
  const [presentations, setPresentations] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (userid === undefined) {
          setLoaded(false);
          return console.log("userid undifine", userid);
        }
        const res = await profileApi.getProfileByUser(userid);
        setProfile(res);
        console.log("profile", res);
        setLoaded(true);
      } catch (error) {
        console.log("Get profile error", error);
        setLoaded(false);
      }
    };
    fetchProfile();
  }, [userid]);
  useEffect(() => {
    const getPresentations = async () => {
      try {
        const res = await presentationApi.getPresentations();
        console.log(res);
        setPresentations(res);
      } catch (error) {
        console.log("Get current user GROUP error", error);
      }
    };
    getPresentations();
  }, []);
  useEffect(() => {
    const getGroups = async () => {
      try {
        const res = await groupApi.getGroups();
        console.log(res);
        setGroups(res);
      } catch (error) {
        console.log("Get current user GROUP error", error);
      }
    };
    getGroups();
  }, []);
  const createItemOptions = [
    {
      key: "1",
      label: (
        <div className="flex bg-[F2F2F2] w-60 justify-between items-center">
          <Image
            src={require("../../assets/images/Kahoot.png")}
            preview={false}
          />
          <Button onClick={() => {
            createPresentation({
              presentationname: `New Presentation ${presentations.length + 1}`,
              presentationdes: "New Presentation",
            })
          }} className="w-[150px]" >Presentation</Button>
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
          <Button onClick={() => {
            createGroup({
              name: `New Group ${groups.length + 1}`,
              description: "New Group",
            })
          }}
            className="w-[150px]">Group</Button>
        </div>
      ),
    },
  ];
  const createPresentation = async (values) => {
    console.log("This is value to submit new presentation: ", values)
    try {
      values.owner = userid;
      values.name = values.presentationname;
      if (values.presentationname === "") {
        message.error("Presentation name can't be empty");
        return;
      }
      if (values.presentationdes === "") {
        message.error("Presentation description can't be empty");
        return;
      }
      const res = await presentationApi.createPresentation(values);
      console.log("res when new presentation from login", res);
      message.success("Create presentation successfully");
      navigate(`/presentations/${res._id}`);
    } catch (error) {
      message.error(error.message);
    }

  };
  const createGroup = async (values) => {
    try {
      console.log(values)
      if (values.groupname === "") {
        message.error("Group name can't be empty");
        return;
      }
      if (values.groupdes === "") {
        message.error("Group description can't be empty");
        return;
      }
      const res = await groupApi.createGroup(values);
      console.log("group create: ", res);
      message.success("Create group successfully");
      navigate(`/groups/${res._id}`);
    } catch (error) {
      message.error(error.message);
    }
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await authApi.logout(dispatch, navigate);
    } catch (error) {
      console.log(error)
    }
  }
  const handleProfile = () => {
    navigate("/profile")
  }
  return (
    <Layout.Header className="color-white bg-white">
      <Row justify="space-between" align="middle" className="bg-white h-full">
        <Col className="h-full">
          <Row className="h-full">
            <Col className="h-full flex">
              <Link to="/" className="w-20 pt-2">
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
          {loaded ? (
            <>
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
                      items: profileOption(handleLogout, handleProfile),
                    }}
                    placement="bottomRight"
                  >
                    <div className="hover:bg-blue-100 px-3 h-10 mt-6 border-2 border-blue-100 rounded-full">                     
                      {(profile) &&
                        <h1 className="relative bottom-4"><UserOutlined className="relative bottom-1" /> {profile?.name}  </h1>
                      }
                    </div>
                  </Dropdown>
                </Space>
              </Space></>)
            : (<>
              <Button onClick={() => {
                navigate("/login")
              }} className="mr-4" type="primary" size="large">
                Login
              </Button>
            </>)
          }
        </Col>
      </Row>
    </Layout.Header>
  );
}
export default Header;
