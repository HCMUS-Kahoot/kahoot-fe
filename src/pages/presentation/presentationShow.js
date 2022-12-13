import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Drawer, Modal, Input, Button, Col, } from "antd";
import { DownCircleFilled, LeftCircleFilled, RightCircleFilled, CloseCircleFilled, MessageOutlined, QuestionCircleOutlined, UpCircleFilled, SendOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useSelector } from "react-redux";
import { Context as RealtimeContext } from "../../store/context/realtimeContext";
import PresentationFilter from './PresentationFilter';

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
                        { name: "Choice 2", pv: 1398, amt: 1110 },
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

    const user = useSelector((state) => state.auth.login.currentUser);

    const { state, initialize_socket, create_room, updated_room, change_slide } = useContext(RealtimeContext);

    useEffect(() => {
        const handleInitializeRoom = async () => {
            const actions = {
                connected: (data) => console.log("Connected with socket ID: ", data),
                error: (data) => console.log("Failed to connect socket: ", data),
                room_updated: (data) => {
                    console.log("event: 'room_updated' received: ", data)
                    updated_room(data)
                    PresentationFilter({ data, slides, setSlides, setSlideIndex, setSlide })
                }
            }
            await initialize_socket(actions)
            await create_room({
                hostId: user.id,
                presentationId
            })
        }
        handleInitializeRoom()
        return () =>
            state?.socket?.disconnect();
    }, [])
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
                    go to <a href={`http://127.0.0.1:3000/presentations/${state?.room?.pin || 'abcd'}/choose`} target="_blank" rel="noreferrer"> here</a> to answer
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
                            const nextSlideIndex = slideIndex - 1 >= 0 ? slideIndex - 1 : 0;
                            change_slide({
                                roomId: state.room.id,
                                slide: nextSlideIndex
                            })
                            setSlideIndex(nextSlideIndex)
                            setSlide(slides[nextSlideIndex])
                        }} />
                        <Button className="m-1" type="primary" shape="circle" icon={<RightCircleFilled />} onClick={() => {
                            const nextSlideIndex = slideIndex + 1 < slides.length ? slideIndex + 1 : slides.length - 1;
                            change_slide({
                                roomId: state.room.id,
                                slide: nextSlideIndex
                            })
                            setSlideIndex(nextSlideIndex)
                            setSlide(slides[nextSlideIndex])
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
