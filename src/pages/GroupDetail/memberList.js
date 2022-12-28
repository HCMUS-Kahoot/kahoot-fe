import React, { useState, useEffect } from "react";
import { Button, Space, Table, Select, message } from 'antd'; import 'antd/dist/antd.less';
import groupApi from "../../api/groupAPI";
import { useNavigate } from "react-router-dom";


const handleChangeRole = async (value, record) => {
    try {
        console.log(value, record);
        const res = await groupApi.changeRole({
            groupId: record.groupId,
            memberEmail: record.email,
            role: value,
        });
        console.log(res);
        message.success("Change role successfully");
    } catch (error) {
        message.error(error.message);
    }
};

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
                    else {
                        handleChangeRole(v, record);
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
                    async () => {
                        const res = await groupApi.deleteUserInGroup(record.groupId, record.email);
                        console.log(res);
                        message.success("Delete member successfully");
                        record.removeMember(record.groupId, record.email);
                        
                    }
                } >Delete</Button>
            </Space>
        ),
    },
];
// const data = [
//     {
//         key: '1',
//         name: 'Tran Dac Toan',
//         role: 'member',
//     },
//     {
//         key: '2',
//         name: 'Dinh Huynh Tien Phu',
//         role: 'co-host',
//     },
//     {
//         key: '3',
//         name: 'Tran Trong Hoang Anh',
//         role: 'member',
//     },
// ];
const MemberList = ({ groupId }) => {

    const [members, setMembers] = useState([]);
    const navigate = useNavigate();
    const groupIdFromParam = groupId.id;

    const removeMember = async (groupId, email) => {
        try {
            setMembers(members.filter((member) => member.email !== email));
        } catch (error) {
            console.log("Remove member error", error);
        }
    };

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
                    groupId: groupId.id,
                    refresh: () => {
                        navigate(`/groups/${groupId.id}`);
                        //message.success("refreshh");
                    },
                    removeMember: removeMember,
                }));
                setMembers(data);
            } catch (error) {
                console.log("Get current user GROUP error", error);
            }
        };
        getMembers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (<Table columns={columns} dataSource={members} />)
};
export default MemberList;
