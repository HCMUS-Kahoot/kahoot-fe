import React, { useEffect, useState } from "react";
import { Input, Modal, message, Row, Col, Menu, } from "antd";
import "antd/dist/antd.min.css";
import PresentationChild from "./presentationChild";
import CreatePresentationForm from "./CreatePresentationForm";
import presentationApi from "../../api/presentationAPI";
import { useSelector } from "react-redux";

export default function PresentationList({
    groupId = null,
    shouldShowCreatePresentationButton = true,
}) {
    const user = useSelector((state) => state.auth.login.currentUser);
    useEffect(() => {
        console.log("this is user: ", user)
    }, [])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [presentations, setPresentations] = useState([]);
    const [filter, setFilter] = useState("all");
    const [presentationsDisplay, setPresentationsDisplay] = useState([]);
    const [tab, setTab] = useState("all");
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const createPresentation = async (values) => {
        console.log("This is value to submit new presentation: ", values)
        try {
            values.owner = user.id
            if (values.presentationname === "") {
                message.error("Presentation name can't be empty");
                return;
            }
            if (values.presentationdes === "") {
                message.error("Presentation description can't be empty");
                return;
            }
            let res = null;
            if (groupId === null) {
                res = await presentationApi.createPresentation(values);
            } else {
                values.groupId = groupId;
                res = await presentationApi.createPresentation(values);
            }
            message.success("Create presentation successfully");
            setIsModalOpen(false);
            const newPresentations = [...presentations];
            newPresentations.push(res);
            setPresentations(newPresentations);
            // }
        } catch (error) {
            message.error(error.message);
        }

    };
    const getPresentations = async () => {
        try {
            if (groupId === null && user.email) {
                const res = await presentationApi.getPresentations(user.email);
                console.log(res);
                setPresentations((prev) => {
                    const newPresentations = [...prev, ...res];
                    setPresentationsDisplay(newPresentations);
                    return [...prev, ...res]
                });
            } else {
                const res = await presentationApi.getPresentationsInGroup(groupId);
                console.log(res);
                setPresentations(res);
            }
        } catch (error) {
            console.log("Get current user GROUP error", error);
        }
    };
    useEffect(() => {
        getPresentations();
        // setPresentationsDisplay(presentations);
    }, []);
    console.log("This is presentations: ", presentations)
    console.log("This is presentationsDisplay: ", presentationsDisplay)
    const filterPresentations = (filter) => {
        if (filter === "all") {
            setPresentationsDisplay(presentations);
        } else if (filter === "owner") {
            const newPresentations = presentations.filter(
                (presentation) => presentation.owner === user.id
            )
            setPresentationsDisplay(newPresentations);
        } else if (filter === "collaborator") {
            const newPresentations = presentations.filter(
                (presentation) => presentation?.collaborators?.some(
                    ({ _id }) => _id === user.id
                )
            )
            setPresentationsDisplay(newPresentations);
        }
    }

    return (
        <>
            <div className="m-4 mx-[2%]">
                {!groupId && <div className="my-navbar">
                    <Menu mode="horizontal" defaultActiveFirst selectedKeys={tab} >
                        <Menu.Item key="hidden"></Menu.Item>
                        <Menu.Item onClick={() => {
                            filterPresentations("all");
                            setTab("all");
                        }} key="all">All my Prestntations</Menu.Item>
                        <Menu.Item onClick={() => {
                            filterPresentations("owner");
                            setTab("owner");
                        }} key="owner">Prestntations I'm owner</Menu.Item>
                        <Menu.Item onClick={() => {
                            filterPresentations("collaborator");
                            setTab("collaborator");
                        }} key="collaborator">Prestntations I'm a collaborator</Menu.Item>
                    </Menu>
                </div>}
                <div className="mx-10 my-5 text-center">
                    <Input.Search
                        placeholder="Search presentations"
                        style={{ width: "100%" }}
                        onSearch={(value) => console.log("Search presentation", value)}
                    />
                </div>
                <div className="flex flex-wrap -mb-4 bg-white w-[100%]">
                    <div className="w-full p-6 shadow-md">
                        <Row>
                            <Col span={6} className="text-center font-bold text-black">
                                Presentation Name
                            </Col>
                            <Col span={5} className="text-center font-bold  text-black">
                                Owner
                            </Col>
                            <Col span={6} className="text-center font-bold   text-black">
                                Modified
                            </Col>
                            <Col span={6} className="text-center  font-bold  text-black">
                                Created
                            </Col>
                            <Col span={1} className="text-center  font-bold  text-black">
                            </Col>
                        </Row>
                    </div>

                    {presentationsDisplay.map((presentation, index) => (
                        <span className="w-full" key={index}>
                            <PresentationChild
                                presentationName={presentation.name}
                                presentationDescription={presentation.description}
                                modified={presentation.lastEdit}
                                created={presentation.createdDate}
                                presentationId={presentation._id}
                                getPresentations={getPresentations}
                                collaborators={presentation.collaborators}
                            />
                        </span>
                    ))}
                    {shouldShowCreatePresentationButton && (
                        <button className="w-full py-1 shadow-md bg-[#f4f4f4] font-bold text-black "
                            onClick={() => {
                                showModal();
                            }}
                        >
                            + New presentation

                        </button>)}
                </div>
            </div>
            <Modal
                title="Create presentation"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <CreatePresentationForm handleSubmit={createPresentation} />
            </Modal>
        </>
    );
}
