import React, { useContext, useState, useEffect } from "react";
import { Drawer, Button, Col, message, Input } from "antd";
import "antd/dist/antd.min.css";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { DownCircleFilled, LeftCircleFilled, RightCircleFilled, CloseCircleFilled, MessageOutlined, QuestionCircleOutlined, UpCircleFilled, SendOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import { Context as RealtimeContext } from "../../store/context/realtimeContext";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PresentationFilter from './PresentationFilter';
import ChatModel from "./components/chats";
import Questions from "./components/questions";

export default function PresentationChoose() {
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
    //todo: let member to submit questions and comments
    const presentation = {
        slides: [
            {
                title: "Slide 1",
                slideType: "MultipleChoice",
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
                title: "Slide 4",
                slideType: "Paragraph",
                content: {
                    paragraph: "This is the paragraph, lorem ispum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                }
            },
            {
                title: "Slide 3",
                slideType: "Heading",
                content: {
                    heading: "This is the heading"
                }
            },
        ]
    }

    const [slides, setSlides] = useState([])
    const [slideIndex, setSlideIndex] = useState(0)
    const [slide, setSlide] = useState(slides[slideIndex])
    const [questions, setQuestions] = useState([])
    const [questionIndex, setQuestionIndex] = useState(0)
    const [chats, setChats] = useState([])
    const [showBar, setShowBar] = useState(false)
    const [isNewChat, setIsNewChat] = useState(false)
    const [isEnd, setIsEnd] = useState(false)
    const user = useSelector((state) => state.auth.login.currentUser);
    const navigate = useNavigate();
    const { state, initialize_socket, updated_room, submit_answer, join_room, disconnect_socket } = useContext(RealtimeContext);
    const params = useParams();
    const handleSubmit = async (choice) => {
        try {
            await submit_answer({
                userId: user.id,
                roomId: state.room.id,
                answer: choice,
                slideIndex
            })
        }
        catch (error) {
            message.error("Failed to submit")
        }
    }
    useEffect(() => {
        const handleJoinRoom = async () => {
            try {
                const actions = {
                    connected: (data) => console.log("Connected with socket ID: ", data),
                    error: (data) => console.log("Failed to connect socket: ", data),
                    room_updated: (data) => {
                        console.log("event: 'room_updated' received: ", data)
                        updated_room(data)
                        const { newSlide, newSlideIndex, newSlides, allChats, allQuestions } =
                            PresentationFilter({ data, slides, user })

                        if (newSlide) {
                            setSlide(newSlide)
                        }
                        if (newSlideIndex) {
                            setSlideIndex(newSlideIndex)
                        }
                        if (newSlides) {
                            setSlides(newSlides)
                        }
                        if (allChats && allChats.length > 0 && allChats.length !== chats.length) {
                            setChats(allChats)
                        }
                        if (allQuestions && allQuestions.length > 0 && allQuestions.length !== questions.length) {
                            setQuestions(allQuestions)
                        }

                    },
                    public_chat: (data) => {
                        console.log("event: 'public_chat' received: ", data)
                        setChats((prev) => {
                            const newChats = [...prev, data]
                            return newChats.sort((a, b) => a.time - b.time)
                        })
                        setIsNewChat(true)
                    },
                    add_question: (data) => {
                        console.log("event: 'add_question' received: ", data)
                        setQuestions((prev) => {
                            const newQuestions = [...prev, data]
                            return newQuestions.sort((a, b) => a.time - b.time)
                        }
                        )
                    },
                    vote_question: (data) => {
                        console.log("event: 'vote_question' received: ", data)

                        setQuestions((prev) => {
                            const newQuestions = prev.map((question) => {
                                if (question.id === data.id) {
                                    return data
                                }
                                return question
                            })
                            return newQuestions.sort((a, b) => a.time - b.time)
                        })
                    },
                    mark_as_read_question: (data) => {
                        console.log("event: 'mark_as_read_question' received: ", data)
                        setQuestions((prev) => {
                            const newQuestions = prev.filter((question) => question.id !== data.id)
                            return newQuestions.sort((a, b) => a.time - b.time)
                        })
                    },
                    end_presentation: (data) => {
                        console.log("event: 'end_presentation' received: ", data)
                        setIsEnd(true)
                    },
                    error_join_room: (data) => {
                        console.log("event: 'error_join_room' received: ", data)
                        message.error(data.message)
                        navigate("/")
                    }

                }
                await initialize_socket(actions)
                await join_room({
                    id: user.id,
                    pin: params.id,
                    name: `${user.firstName} ${user.lastName}`,
                });
            } catch (error) {
                console.log(error);
            }
        };
        handleJoinRoom();

        return () => {
            console.log("disconnecting socket")
            disconnect_socket()
        }
    }, [])
    if (isEnd) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <div className="text-3xl font-bold text-center">
                    Presentation has ended
                </div>
                <Link to="/">
                    <Button className="ml-4" type="primary">Go to Home</Button>
                </Link>
            </div>
        )
    }
    return (
        <>
            <ChatModel chats={chats} openDrawer={openDrawer} onClose={onClose} isNewChat={isNewChat} setIsNewChat={setIsNewChat} />
            <Questions
                questions={questions} setQuestions={setQuestions}
                questionIndex={questionIndex} setQuestionIndex={setQuestionIndex}
                isModalOpen={isModalOpen} handleCancel={handleCancel}
                handleOk={handleOk}
            />
            <Col span={24} className="slide h-[100%] bg-gray-200 text-center flex justify-center flex-row "
                onMouseOver={() => setShowBar(true)}
                onMouseLeave={() => setShowBar(false)}
            >
                <div className="h-6" />
                <div className=" border-2 border-gray-400 h-[60%] w-[60%] ml-[20%] bg-white">
                    <div className="h-6 text-center font-bold text-gray-400" >
                        select answer and click submit
                    </div>
                    <div className="slide-title text-3xl font-bold text-center mb-7 bg-white">
                        {slide?.title}
                    </div>
                    <div className="slide-content -gray-600 w-[90%] h-[60%] bg-white">
                        {(slide?.slideType === "MultipleChoice" && slide?.submitted) &&
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={slide?.content.data}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Bar dataKey="pv" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        }
                        {
                            slide?.slideType === "Heading" && <>
                                <div className="text-7xl font-bold text-center mt-60">
                                    {slide?.content.heading}
                                </div>
                            </>
                        }
                        {
                            slide?.slideType === "Paragraph" && <>
                                <div className="text-2xl text-center mx-40 border h-[100%] p-6 shadow-md">
                                    {slide?.content.paragraph.split('\n\n').map(paragraph =>
                                        <p>
                                            {paragraph.split('\n').reduce((total, line) => [total, <br />, line])}
                                        </p>
                                    )}
                                </div>
                            </>
                        }
                    </div>
                </div>
                <div className="slide-info-editor mt-3 absolute bottom-[0px] border-t-2 border-gray-300 shadow-inner w-full h-52 bg-white flex flex-col justify-center" >
                    {slide?.slideType === "MultipleChoice" &&
                        <div>
                            <div className="flex justify-center items-center w-full">

                                <div className="flex flex-wrap flex-row items-center w-[60%]">
                                    {
                                        (slide?.submitted) ?
                                            null :
                                            slide?.content?.choices?.map((choice, index) => {
                                                return (
                                                    <Button className="w-64 mx-3 my-1"
                                                        onClick={() => handleSubmit(choice)} key={index}> {choice} </Button>
                                                )
                                            })
                                    }
                                </div >

                            </div>
                            {/* <Button className="mt-5" type="primary" >Submit</Button> */}
                        </div>
                    }
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
            </Col>
        </>
    );
}
