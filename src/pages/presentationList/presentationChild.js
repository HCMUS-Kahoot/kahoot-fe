import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Row, Col, Button, Dropdown, message, Modal, Input } from "antd";
import { SettingOutlined, PlayCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";
import { Link, useNavigate } from "react-router-dom";
import presentationApi from "../../api/presentationAPI";
export default function PresentationChild({
    presentationName,
    owner,
    modified,
    created,
    presentationId,
    getPresentations,
    collaborators,
}) {
    const navigation = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModal2Open, setIsModal2Open] = useState(false);
    const [newPresentationName, setNewPresentationName] = useState(presentationName);
    const [emailToAddCollaborator, setEmailToAddCollaborator] = useState("");
    const [listOfCollaborators, setListOfCollaborators] = useState(collaborators?collaborators:[]);
    const user = useSelector((state) => state.auth.login.currentUser);
    const userId = user?._id || user?.id;
    useEffect(()=>{
        console.log("This is collaborator: ",collaborators);
    },[])
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        const res = await presentationApi.updatePresentationName(presentationId, newPresentationName);
        message.success(`Rename button clicked, id${presentationId},new name is ${newPresentationName}'`);
        console.log("resrename", res);
        getPresentations();
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleRemove = async (collaboratorEmail) =>{
        console.log("This is email to remove: ", collaboratorEmail);
        const res = await presentationApi.deleteCollaborator(userId, presentationId, collaboratorEmail);
        setListOfCollaborators((prevListValue)=>{
            return prevListValue.filter(user => user.email !== collaboratorEmail)
        })
        return res;
    }
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
            key: '2',
            label: <span
                onClick={() => {
                    setIsModal2Open(true);
                }}
            >Collaborators</span>,
        },
        {
            key: '4',
            danger: true,
            label: <span
                onClick={async () => {
                    const res = await presentationApi.deletePresentation(presentationId);
                    console.log("res delete", res);
                    message.success(`Delete success'`);
                    getPresentations();
                }}
            >Delete</span>,
        },
        
    ];


    return (
        <>
            <div className="m-1 hover:bg-gray-200 w-[98%] h-12 pt-2">
                {/* one row of presentation, with 4 collums to show presentation properties and one play button */}
                <Row>
                    <Col span={6} className="text-left pl-[5%] font-bold text-black">
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
                    <Modal title="List of collaborators" open={isModal2Open} onOk={() => { setIsModal2Open(false) }} onCancel={() => { setIsModal2Open(false)}}>
                        <Input style={
                            {
                                width: "80%",
                                marginRight: "10px"
                            }
                        } placeholder="Enter email to add collaborator" value={emailToAddCollaborator} onChange={(e) => {
                            setEmailToAddCollaborator(e.target.value);
                        }} />
                        <Button className="mt-2" type="primary" onClick={async () => {
                            console.log("emailToAddCollaborator", emailToAddCollaborator);
                            try{
                                const result = await presentationApi.addCollaborator(userId, presentationId,emailToAddCollaborator);
                                console.log("This is the result in UI: ", result)
                                if(result)
                                {
                                    message.success(`Add collaborator success with email ${emailToAddCollaborator}`);
                                    setListOfCollaborators((prevListValue)=>[...prevListValue,{email: emailToAddCollaborator}]);
                                    setEmailToAddCollaborator("");
                                }
                            }catch(error){
                                message.warning('Cannot add because error: ', error)
                            }

                        }}>Add</Button>
                        <div className="w-full h-96 overflow-y-scroll">
                            {listOfCollaborators.map((item, index) => {
                                return (
                                    <div className="flex justify-between items-center p-4 hover:bg-slate-300" key={index}>
                                        <div className="text-left font-bold text-black">
                                            {item.email}
                                        </div>
                                        <div className="text-right font-bold text-black">
                                            <Button danger onClick={()=>handleRemove(item.email)}>Remove</Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>                            
                    </Modal>
                </Row>

            </div>
        </>
    );
}
