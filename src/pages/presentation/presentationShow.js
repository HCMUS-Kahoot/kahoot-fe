import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Drawer, Modal, Input, Button, Col } from "antd";
import { OrderedListOutlined, DownCircleFilled, LeftCircleFilled, RightCircleFilled, CloseCircleFilled, MessageOutlined, QuestionCircleOutlined, UpCircleFilled, SendOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useSelector } from "react-redux";
import { Context as RealtimeContext } from "../../store/context/realtimeContext";
import PresentationFilter from './PresentationFilter';
import ChatModel from "./components/chats";
import Questions from "./components/questions";
import UserSubmit from "./components/usersubmit";
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

  const [openDrawer2, setOpenDrawer2] = useState(false);
  const showDrawer2 = () => {
    setOpenDrawer2(true);
  };
  const onClose2 = () => {
    setOpenDrawer2(false);
  };

  const presentation = {
    slides: [
      {
        title: "Slide 1",
        slideType: "MultipleChoice",
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
  const [slide, setSlide] = useState()
  const presentationId = useParams().id
  const navigate = useNavigate();
  const [showBar, setShowBar] = useState(false)
  const [questions, setQuestions] = useState([])
  const [chats, setChats] = useState([]);
  const [userSubmit, setUserSubmit] = useState([]); // for user submit (todo)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [isNewChat, setIsNewChat] = useState(false)
  const user = useSelector((state) => state.auth.login.currentUser);

  const { state, initialize_socket, create_room, updated_room, change_slide, disconnect_socket, end_presentation } = useContext(RealtimeContext);

  useEffect(() => {
    const handleInitializeRoom = async () => {
      const actions = {
        connected: (data) => console.log("Connected with socket ID: ", data),
        error: (data) => console.log("Failed to connect socket: ", data),
        room_updated: async (data) => {
          console.log("event: 'room_updated' received: ", data)
          await updated_room(data)
          const { newSlide, newSlideIndex, newSlides, allChats, allQuestions, userSubmited } = PresentationFilter({ data, slides, user })

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
            setQuestions(() => {
              return allQuestions
                .filter((question) => !question.read)
                .sort((a, b) => a.time - b.time)
            })
          }
          console.log("userSubmited: ", userSubmited)
          if (userSubmited) {
            console.log("userSubmited: ", userSubmited)
            setUserSubmit(userSubmited)
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
            newQuestions.filter((question) => question.read)
            return newQuestions.sort((a, b) => a.time - b.time)
          })
        },
        mark_as_read_question: (data) => {
          console.log("event: 'mark_as_read_question' received: ", data)
          setQuestions((prev) => {
            const newQuestions = prev.filter((question) => question.questionId !== data.questionId)
            return newQuestions.sort((a, b) => a.time - b.time)
          })
          setQuestionIndex((prev) => {
            if (prev === 0) {
              return 0
            }
            return prev - 1
          })
        },
        end_presentation: (data) => {
          console.log("event: 'end_presentation' received: ", data)
          navigate(`/presentations/${presentationId}`)
        }
      }
      await initialize_socket(actions)
      await create_room({
        hostId: user.id,
        presentationId
      })

    }
    handleInitializeRoom()
    return () => {
      console.log("disconnecting socket")
      disconnect_socket()
    }
  }, [])
  const handleEndPresentation = () => {
    console.log("end presentation", state?.room?.id)
    end_presentation({
      roomId: state?.room?.id
    })
  }
  return (
    <>
      <Questions
        questions={questions} setQuestions={setQuestions}
        questionIndex={questionIndex} setQuestionIndex={setQuestionIndex}
        isModalOpen={isModalOpen} handleCancel={handleCancel}
        handleOk={handleOk} canMarkAsRead={true}
      />
      <ChatModel chats={chats} openDrawer={openDrawer} onClose={onClose} isNewChat={isNewChat} setIsNewChat={setIsNewChat} />
      <UserSubmit userSubmits={userSubmit} openDrawer={openDrawer2} onClose={onClose2} slides={slides} />

      <Col span={24} className="slide h-[100%] bg-white" >
        <div className="flex justify-between items-center h-12 bg-gray-100">
          <Button type="primary" onClick={handleEndPresentation} className="ml-4">End Presentation</Button>
        </div>
        <div className="h-6 text-center font-bold text-gray-400" >
          go to <a href={`${process.env.REACT_APP_USER_URL}/presentations/${state?.room?.pin || 'abcd'}/choose`} target="_blank" rel="noreferrer"> here</a> to answer
          or input pin: {state?.room?.pin || 'abcd'}
        </div>
        <div className="slide-title text-3xl font-bold text-center mb-7">
          {slide?.title}
        </div>
        <div className="slide-content -gray-600 w-[100%] h-[70%]">
          {slide?.slideType === "MultipleChoice" &&
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

            {slideIndex !== 0 && <Button className="m-1" type="primary" shape="circle" icon={<LeftCircleFilled />} onClick={() => {
              const nextSlideIndex = slideIndex - 1 >= 0 ? slideIndex - 1 : 0;
              change_slide({
                roomId: state.room.id,
                slide: nextSlideIndex
              })
              setSlideIndex(nextSlideIndex)
              setSlide(slides[nextSlideIndex])
            }} />}
            {slideIndex < slides.length && <Button className="m-1" type="primary" shape="circle" icon={<RightCircleFilled />} onClick={() => {
              const nextSlideIndex = slideIndex + 1 < slides.length ? slideIndex + 1 : 0;
              change_slide({
                roomId: state.room.id,
                slide: nextSlideIndex
              })
              setSlideIndex(nextSlideIndex)
              setSlide(slides[nextSlideIndex])
            }} />}
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
            <Button className="m-1" type="primary" shape="circle" icon={< OrderedListOutlined />} onClick={
              () => {
                showDrawer2()
              }
            } />
          </div>
        </div>
      </Col>
    </>
  )
}
