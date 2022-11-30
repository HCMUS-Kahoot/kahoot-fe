import React, { useState, useEffect } from "react";
import { Button, Space, Table, Tag, Select, message } from 'antd'; import 'antd/dist/antd.css';
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
        render: (_, record) => (
            <>
                {/* <Tag color={record?.role == 'member' ? 'geekblue' : 'volcano'} key={record?.role}>
                    {record?.role.toUpperCase()}
                </Tag> */}
                <Select disabled={record?.role === 'owner'} defaultValue={record?.role} style={{ width: 120 }} onChange={(v) => {
                    console.log("change rolde: ", record, "to:", v);
                    if (record?.role === 'owner' && (v === 'member' || v === 'cohost')) {
                        message.error("Owner can't change to member or cohost");
                    }
                }}
                    options={[
                        { label: 'Member', value: 'member' },
                        { label: 'Owner', value: 'owner' },
                        { label: 'Co-host', value: 'cohost' },
                    ]}
                >

                </Select>
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
