import React, { useState, useContext } from 'react'
import { Modal, Button, Input } from 'antd'
import { DownCircleFilled, UpCircleFilled } from "@ant-design/icons";

import { Context as RealtimeContext } from "../../../store/context/realtimeContext";
import { SendOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

function Questions({ isModalOpen, handleOk, handleCancel, questions, setQuestions, questionIndex, setQuestionIndex }) {
  const [questionInput, setQuestionInput] = useState('');
  const user = useSelector((state) => state.auth.login.currentUser);
  const { state, add_question } = useContext(RealtimeContext);
  const handleSubmitQuestion = () => {
    add_question({
      userId: user.id,
      question: questionInput,
      roomId: state?.room?.id
    })
    setQuestionInput('')
  }

  const handleSubmitQuestionByEnter = (event) => {
    if (event.key === 'Enter') {
      handleSubmitQuestion()
    }
  }
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
              {questions[questionIndex]?.question}
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
        <div className="flex justify-evenly w-full absolute bottom-3">
          <Input placeholder="Comment" className="relative right-3" style={{ width: "70%" }}
            onChange={(e) => setQuestionInput(e.target.value)}
            value={questionInput}
            onKeyDown={(e) => handleSubmitQuestionByEnter(e)}
          />
          <Button className="bg-slate-300" icon={<SendOutlined />}
            onClick={() => handleSubmitQuestion()}
          />
        </div>
      </Modal>
    </>
  )
}

export default Questions
