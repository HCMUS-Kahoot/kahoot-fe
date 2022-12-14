import React, { useState } from "react";
import { Row, Col, Button, Dropdown, Space, message, Modal, Input } from "antd";
import { SettingOutlined, PlayCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";
import { Link, useNavigate } from "react-router-dom";

export default function PresentationChild({
    presentationName,
    owner,
    modified,
    created,
    presentationId,
}) {
    const navigation = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPresentationName, setNewPresentationName] = useState(presentationName);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        message.success(`Rename button clicked, id${presentationId},new name is ${newPresentationName}'`);
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const itemMenus = [
        {
            key: '1',
            label: (
                <span onClick={() => {
                    showModal();
                }} >
                    Rename
                </span>
            ),
        },
        {
            key: '4',
            danger: true,
            label: <span
                onClick={() => {
                    message.warning(`Delete button clicked,id${presentationId}'`);
                }}
            >Delete</span>,
        },
    ];
    return (
        <>
            <div className="m-1 hover:bg-gray-200 w-[98%] h-12 pt-2">
                {/* one row of presentation, with 4 collums to show presentation properties and one play button */}
                <Row>
                    <Col span={6} className="text-left pl-24 font-bold text-black">
                        <Button
                            onClick={() => {
                                navigation(`/presentations/${presentationId}/show`);
                            }}
                            type="primary" shape="circle" icon={<PlayCircleOutlined />} className="mr-3" />
                        {' '}{' '}{' '}
                        <Link to={`/presentations/${presentationId}`} className="text-black" >{presentationName}</Link>
                    </Col>
                    <Col
                        onClick={() => {
                            navigation(`/presentations/${presentationId}`);
                        }}

                        span={5} className="text-center font-bold  text-gray-500">
                        {owner}
                    </Col>
                    <Col onClick={() => {
                        navigation(`/presentations/${presentationId}`);
                    }}
                        span={6} className="text-center font-bold   text-gray-500">
                        {new Date(modified).toLocaleString()}
                    </Col>
                    <Col onClick={() => {
                        navigation(`/presentations/${presentationId}`);
                    }}
                        span={6} className="text-center  font-bold  text-gray-500">
                        {new Date(created).toLocaleString()}
                    </Col>
                    <Col span={1} className="text-center  font-bold  text-gray-500">
                        <Dropdown
                            menu={{
                                items: itemMenus,
                            }}
                        >
                            <SettingOutlined />
                        </Dropdown>
                    </Col>
                    <Modal title="Rename" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Input defaultValue={presentationName}
                            onChange={(e) => {
                                setNewPresentationName(e.target.value);
                            }}
                        />
                    </Modal>
                </Row>

            </div>
        </>
    );
}
