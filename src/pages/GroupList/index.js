import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input, Menu, Modal } from "antd";
import "antd/dist/antd.min.css";
import GroupChild from "./GroupChild";
import GroupChildAdd from "./GroupChildAdd";
import CreateGroupForm from "./CreateGroupForm";
import groupApi from "../../api/groupAPI";

export default function GroupList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [groups, setGroups] = useState([]);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const createGroup = async (values) => {
        console.log(values)
        // try {
        //     const res = await groupApi.createGroup(values);
        //     setGroups([...groups, res.data]);
        // } catch (error) {
        //     console.log("Create group error", error);
        // }
    };
    useEffect(() => {
        const getGroups = async () => {
            try {
                const res = await groupApi.getGroups();
                console.log(res);
            } catch (error) {
                console.log("Get current user GROUP error", error);
            }
        };
        getGroups();
    }, []);

    return (
        <>
            <div className="m-4 mx-14">
                <div className="my-navbar">
                    <Menu mode="horizontal" defaultActiveFirst>
                        <Menu.Item key="mail"></Menu.Item>
                        <Menu.Item key="myGroup">My Groups</Menu.Item>
                        <Menu.Item key="groupImIn">Groups I'm in</Menu.Item>
                    </Menu>
                </div>
                <div className="mx-10 my-5 text-center">
                    <Input.Search
                        placeholder="Search groups"
                        style={{ width: "400px" }}
                        onSearch={(value) => console.log("Search group", value)}
                    />
                </div>
                <div class="flex flex-wrap -mb-4 bg-white">
                    {/* <Link to={"/groups/groupid"} > <GroupChild groupName={"Group name"} groupDescription={"Group description will be here"} /></Link>
                    <Link to={"/groups/groupid"}> <GroupChild groupName={"Group name"} groupDescription={"Group description will be here"} /></Link>
                    <Link to={"/groups/groupid"}> <GroupChild groupName={"Group name"} groupDescription={"Group description will be here"} /></Link>
                    <Link to={"/groups/groupid"}> <GroupChild groupName={"Group name"} groupDescription={"Group description will be here"} /></Link>
                    <Link to={"/groups/groupid"}> <GroupChild groupName={"Group name"} groupDescription={"Group description will be here"} /></Link> */}
                    {groups.map((group) => (
                        <Link to={`/groups/${group._id}`}>
                            <GroupChild
                                groupName={group.name}
                                groupDescription={group.description}
                            />
                        </Link>
                    ))}
                    <button
                        onClick={() => {
                            showModal();
                        }}
                    >
                        {" "}
                        <GroupChildAdd />
                    </button>
                </div>
            </div>
            <Modal
                title="Create group"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <CreateGroupForm handleSubmit={createGroup} />
            </Modal>
        </>
    );
}
