import React, { useState, useContext, useEffect } from 'react'
import { Modal, Button, Input } from 'antd'
import { DownCircleFilled, UpCircleFilled, LikeFilled } from "@ant-design/icons";

import { Context as RealtimeContext } from "../../../store/context/realtimeContext";
import { SendOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

function Questions({ isModalOpen, handleOk, handleCancel, questions, setQuestions, questionIndex, setQuestionIndex }) {
  const [questionInput, setQuestionInput] = useState('');
  const user = useSelector((state) => state.auth.login.currentUser);
  const { state, add_question, vote_question, mark_as_read } = useContext(RealtimeContext);
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
  const handleVote = (question) => {
    vote_question({
      questionId: question.questionId,
      userId: question.userId,
      roomId: state?.room?.id,
      userIdVote: user.id
    })
  }
  const handleMarkAsRead = (question) => {
    mark_as_read({
      questionId: question.questionId,
      roomId: state?.room?.id,
    })
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
            <div className="text-center w-full">
              {questions[questionIndex] && (<><h1>
                {questions[questionIndex]?.question}
              </h1><Button className="bg-slate-300" icon={
                questions[questionIndex]?.voted?.includes(user.id) ?
                  <LikeFilled style={{ color: "blue" }} /> :
                  <LikeFilled />
              }
                onClick={() => handleVote(questions[questionIndex])} />
                <h1>{questions[questionIndex]?.voted?.length}</h1>
              </>)}
            </div>
            <div className="text-center w-full">
              <Button className="bg-slate-300" icon={<DownCircleFilled />} onClick={() => {
                setQuestionIndex(questionIndex + 1 < questions.length ? questionIndex + 1 : questions.length - 1)
              }} />
            </div>
          </div>
          <Button className="bg-slate-300 mt-8" type="primary" onClick={() => {
            //remove question
            // setQuestions(questions.filter((question, index) => index !== questionIndex))
            // setQuestionIndex(questionIndex - 1 >= 0 ? questionIndex - 1 : 0)
            handleMarkAsRead(questions[questionIndex])
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
