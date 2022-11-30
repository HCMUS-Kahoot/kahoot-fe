import React from "react";
import { Button, Space, Table, Tag } from 'antd'; import 'antd/dist/antd.css';

const columns = [
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
const MemberList = () => <Table columns={columns} dataSource={data} />;
export default MemberList;
