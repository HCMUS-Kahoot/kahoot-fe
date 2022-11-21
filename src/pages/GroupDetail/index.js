import React, { useState } from "react";
import { Menu, Modal, Row, Col, Card } from "antd";
import 'antd/dist/antd.min.css';
import { ExpandOutlined, CopyOutlined } from "@ant-design/icons";

export default function GroupDetail() {
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
    return (
        <>
            <div className="mx-72">
                <div className="my-navbar">
                    <Menu mode="horizontal" defaultActiveFirst>
                        <Menu.Item key="mail">
                            Posts
                        </Menu.Item>

                        <Menu.Item key="myGroup" >
                            Members
                        </Menu.Item>
                    </Menu>
                </div>
                <div className="body">
                    <Row >
                        <Col span={6}>
                            <div className="m-4">
                                <Card className="hover:shadow-xl" title="Class code" onClick={() => { showModal(); }} >
                                    <span className="text-2xl text-green-600 font-bold cursor-pointer ">dhtpdt <ExpandOutlined className="relative bottom-2" /></span>
                                </Card>
                            </div>
                        </Col>
                        <Col span={18}>
                            <div className="m-4">
                                <Card title="Posts" ></Card>
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
