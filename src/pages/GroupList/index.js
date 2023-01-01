import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Input, Menu, Modal, Button, message } from "antd";
import "antd/dist/antd.min.css";
import GroupChild from "./GroupChild";
import GroupChildAdd from "./GroupChildAdd";
import CreateGroupForm from "./CreateGroupForm";
import groupApi from "../../api/groupAPI";

export default function GroupList({ tab }) {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [groups, setGroups] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
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
            console.log(res);
            // if (res.status === 400) {
            //     message.error("Create group failed");
            // } else {
            message.success("Create group successfully");
            setIsModalOpen(false);
            const newGroups = [...groups];
            newGroups.push(res);
            setGroups(newGroups);
            // }
        } catch (error) {
            message.error(error.message);
        }

    };
    useEffect(() => {
        const getGroups = async () => {
            try {
                const res = await groupApi.getGroupsWithTab(tab);
                console.log(res);
                setGroups(res);
                setLoaded(true);
            } catch (error) {
                console.log("Get current user GROUP error", error);
            }
        };
        getGroups();
    }, [tab]);

    return (
        <>
            <div className="m-4 mx-14">
                <div className="my-navbar">
                    <Menu mode="horizontal" defaultActiveFirst selectedKeys={tab} >
                        <Menu.Item key="hidden"></Menu.Item>
                        <Menu.Item onClick={() => { 
                            setLoaded(false);
                            navigate("/groups")
                        }} key="myGroup">All my groups</Menu.Item>
                        <Menu.Item onClick={() => {
                            setLoaded(false);

                            navigate("/groups/admin")
                        }} key="groupImAdmin">Groups I'm Admin</Menu.Item>
                        <Menu.Item onClick={() => {
                            setLoaded(false);

                            navigate("/groups/co-owner")
                        }} key="groupImCoOwner">Groups I'm co-owner</Menu.Item>
                        <Menu.Item onClick={() => {
                            setLoaded(false);

                            navigate("/groups/member")
                        }} key="groupImIn">Groups I'm member</Menu.Item>
                    </Menu>
                </div>
                <div className="mx-10 my-5 text-center">
                    <Input.Search
                        placeholder="Search groups"
                        style={{ width: "400px" }}
                        onSearch={(value) => console.log("Search group", value)}
                    />
                </div>
                <div className="flex flex-wrap -mb-4 bg-white">
                    { 
                        !loaded && <div className="w-full text-center font-bold text-3xl">Loading...</div>
                    }
                    {loaded && groups?.map((group) => (
                        <Link to={`/groups/${group._id}`}>
                            <GroupChild
                                groupName={group.name}
                                groupDescription={group.description}
                            />
                        </Link>
                    ))}
                    {(tab === "myGroup" || tab ==="groupImAdmin") &&
                        <button
                            onClick={() => {
                                showModal();
                            }}
                        >
                            {" "}
                            <GroupChildAdd />
                        </button>
                    }
                    {
                        groups?.length === 0 && loaded && <div className="w-full text-center font-bold text-3xl py-20">No group found</div>
                    }
                </div>
            </div>
            <Modal
                title="Create group"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <CreateGroupForm handleSubmit={createGroup} />
            </Modal>
        </>
    );
}
