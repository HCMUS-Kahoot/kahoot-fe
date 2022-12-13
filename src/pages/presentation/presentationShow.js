import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Drawer, Modal, Input, Button, Col, } from "antd";
import { DownCircleFilled, LeftCircleFilled, RightCircleFilled, CloseCircleFilled, MessageOutlined, QuestionCircleOutlined, UpCircleFilled, SendOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';


export default function PresentationShow() {
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
    const [openDrawer, setOpenDrawer] = useState(false);
    const showDrawer = () => {
        setOpenDrawer(true);
    };
    const onClose = () => {
        setOpenDrawer(false);
    };
    const presentation = {
        slides: [
            {
                title: "Slide 1",
                slideType: "Multiple Choice",
                content: {
                    choices: ["Choice 1", "Choice 2", "Choice 3"],
                    data: [
                        { name: "Choice 1", pv: 2400, amt: 2400 },
                        { name: "Choice 2", pv: 1398, amt: 2210 },
                        { name: "Choice 3", pv: 9800, amt: 2290 },
                    ]
                }
            },
            {
                title: "Slide 2",
                slideType: "Multiple Choice",
                content: {
                    choices: ["Choice 1", "Choice 2", "Choice 3"],
                    data: [
                        { name: "Choice 1", pv: 2400, amt: 2400 },
                        { name: "Choice 2", pv: 1398, amt: 2210 },
                        { name: "Choice 3", pv: 9800, amt: 2290 },
                    ]
                }
            },
        ]
    }

    const presentationData = presentation
    const [slides, setSlides] = useState(presentationData.slides)
    const [slideIndex, setSlideIndex] = useState(0)
    const [slide, setSlide] = useState(slides[slideIndex])
    const presentationId = useParams().id
    const navigate = useNavigate();
    const [showBar, setShowBar] = useState(false)
    const [questions, setQuestions] = useState([
        {
            question: "Question 1",
        },
        {
            question: "Question 2",
        },
        {
            question: "Question 3",
        },
    ])
    const [questionIndex, setQuestionIndex] = useState(0)
    return (
        <>
            <Modal title="Questions" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{
                width: "1800px",
                height: "1000px",
            }}
                footer={[]}

            >
                <div className="text-center">
                    <div className="h-[300px] flex flex-col justify-between">
                        <div className="text-center w-full">
                            <Button className="bg-slate-300" icon={<UpCircleFilled />} onClick={() => {
                                setQuestionIndex(questionIndex - 1 >= 0 ? questionIndex - 1 : 0)
                            }} />
                        </div>
                        <h1>
                            {questions[questionIndex].question}
                        </h1>
                        <div className="text-center w-full">
                            <Button className="bg-slate-300" icon={<DownCircleFilled />} onClick={() => {
                                setQuestionIndex(questionIndex + 1 < questions.length ? questionIndex + 1 : questions.length - 1)
                            }} />
                        </div>
                    </div>
                    <Button className="bg-slate-300 mt-8" type="primary" onClick={() => {
                        //remove question
                        setQuestions(questions.filter((question, index) => index !== questionIndex))
                        setQuestionIndex(questionIndex - 1 >= 0 ? questionIndex - 1 : 0)
                    }}>
                        Mark as answered
                    </Button>
                </div>
            </Modal>
            <Drawer title="Messages" placement="right" onClose={onClose} open={openDrawer}>
                <div className="shadow-md bg-white rounded-lg p-3 my-2">
                    sadasdasd
                </div>
                <div className="shadow-md bg-white rounded-lg p-3 my-2">
                    lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                </div>
                <div className="flex justify-evenly w-full absolute bottom-3">
                    <Input placeholder="Comment" className="relative right-3" style={{ width: "70%" }} /> <Button className="bg-slate-300" icon={<SendOutlined />} />
                </div>
            </Drawer>
            <Col span={24} className="slide h-[100%] bg-white" >
                <div className="h-6 text-center font-bold text-gray-400" >
                    go to https://presentations/asa/using/{presentationId} to answer
                </div>
                <div className="slide-title text-3xl font-bold text-center mb-7">
                    {slide.title}
                </div>
                <div className="slide-content -gray-600 w-[100%] h-[70%]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={slide.content.data}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Bar dataKey="pv" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="slide-info-editor mt-3 absolute bottom-[-30px] w-full flex justify-between h-10"
                    onMouseOver={() => setShowBar(true)}
                    onMouseLeave={() => setShowBar(false)}

                >
                    <div className=""
                        style={{ display: showBar ? "block" : "none" }}
                    >
                        <Button className="m-1" type="primary" shape="circle" icon={<CloseCircleFilled />} onClick={() => {
                            navigate(`/presentations/${presentationId}`)
                        }} >

                        </Button>

                        <Button className="m-1" type="primary" shape="circle" icon={<LeftCircleFilled />} onClick={() => {
                            setSlideIndex(slideIndex - 1)
                            setSlide(slides[slideIndex - 1])
                        }} />
                        <Button className="m-1" type="primary" shape="circle" icon={<RightCircleFilled />} onClick={() => {
                            setSlideIndex(slideIndex + 1)
                            setSlide(slides[slideIndex + 1])
                        }} />
                    </div>
                    <div className="m-1"
                        style={{ display: showBar ? "block" : "none" }}
                    >
                        <Button className="m-1" type="primary" shape="circle" icon={<MessageOutlined />} onClick={
                            () => {
                                showDrawer()
                            }
                        } />
                        <Button className="m-1" type="primary" shape="circle" icon={<QuestionCircleOutlined />} onClick={
                            () => {
                                showModal()
                            }
                        } />
                    </div>
                </div>
            </Col>
        </>
    )
}
