import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Modal, Row, Col, Card } from "antd";
import 'antd/dist/antd.css';
import { ExpandOutlined, CopyOutlined } from "@ant-design/icons";
import PostList from "./postList";
import MemberList from "./memberList";
export default function GroupDetail({ tab = "members" }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const id = window.location.pathname.split("/")[2];
    const navigate = useNavigate();
    return (
        <>
            <div className="mx-72">
                <div className="my-navbar shadow-sm rounded-md">
                    <Menu mode="horizontal" defaultActiveFirst>
                        <Menu.Item key="posts" onClick={() => {
                            navigate(`/groups/${id}/posts`)
                        }} >
                            Posts
                        </Menu.Item>

                        <Menu.Item key="members" onClick={() => {
                            navigate(`/groups/${id}`)
                        }} >
                            Members
                        </Menu.Item>
                    </Menu>
                </div>
                <div className="body">
                    <Row >
                        <Col span={6}>
                            <div className="m-4 shadow-sm rounded-md">
                                <Card className="hover:shadow-xl" title="Class code" onClick={() => { showModal(); }} >
                                    <span className="text-2xl text-green-600 font-bold cursor-pointer ">dhtpdt <ExpandOutlined className="relative bottom-2" /></span>
                                </Card>
                            </div>
                        </Col>
                        <Col span={18}>
                            <div className="m-2 bg-white p-2 shadow-md rounded-md">
                                {tab === "members" ? <MemberList /> : <PostList />}
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

            <Modal title="Class code" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className="text-center text-green-600">
                    <h1 className="font-bold text-5xl text-green-600">dhtpdt</h1>
                    <hr />
                    <span className="text-green-600"> copy code <CopyOutlined /> </span>
                </div>
            </Modal>
        </>

    );
}
