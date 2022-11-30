import React, { useState, useEffect } from "react";
import { Button, Space, Table, Tag } from 'antd'; import 'antd/dist/antd.css';
import groupApi from "../../api/groupAPI";

const columns = [
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Role',
        key: 'role',
        dataIndex: 'role',
        render: (_, { role }) => (
            <>
                <Tag color={role == 'member' ? 'geekblue' : 'volcano'} key={role}>
                    {role.toUpperCase()}
                </Tag>

            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Button onClick={
                    () => {
                        console.log("del:", record);
                    }
                } >Delete</Button>
            </Space>
        ),
    },
];
const data = [
    {
        key: '1',
        name: 'Tran Dac Toan',
        role: 'member',
    },
    {
        key: '2',
        name: 'Dinh Huynh Tien Phu',
        role: 'co-host',
    },
    {
        key: '3',
        name: 'Tran Trong Hoang Anh',
        role: 'member',
    },
];
const MemberList = ({ groupId }) => {

    const [members, setMembers] = useState([]);

    useEffect(() => {
        const getMembers = async () => {
            try {
                const res = await groupApi.getUserInGroup(groupId);
                console.log(res);
                const data = res.map((data, index) => ({
                    key: `${index}`,
                    email: data.email,
                    name: (data.firstName || "") + " " + (data.lastName || ""),
                    role: data.role,
                }));
                setMembers(data);
            } catch (error) {
                console.log("Get current user GROUP error", error);
            }
        };
        getMembers();
    }, []);

    return (<Table columns={columns} dataSource={members} />)
};
export default MemberList;
