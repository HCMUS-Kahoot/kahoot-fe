import React, { useContext, useState, useEffect, useRef } from "react";

import { Context as RealtimeContext } from "../../../store/context/realtimeContext";
import { Drawer, Input, Button, notification } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

function ChatModel({ chats, openDrawer, onClose, isNewChat, setIsNewChat }) {
  const [chatInput, setChatInput] = useState('');
  const user = useSelector((state) => state.auth.login.currentUser);
  const { state, public_chat } = useContext(RealtimeContext);
  const openNotification = ({ name, message }) => {
    notification.open({
      message: `${name}`,
      description: `${message}`,
      placement: "bottomRight",
    });
  };
  useEffect(() => {
    if (chats.length > 0) {
      const lastChat = chats[chats.length - 1];
      if (lastChat.userId !== user.id && isNewChat) {
        openNotification(lastChat)
        setIsNewChat(false)
      }
    }
  }, [chats, isNewChat])
  const handleSubmitMessage = () => {
    public_chat({
      userId: user.id,
      message: chatInput,
      roomId: state?.room?.id
    })
    setChatInput('')
  }

  const handleSubmitMessageByEnter = (event) => {
    if (event.key === 'Enter') {
      handleSubmitMessage()
    }
  }
  return (
    <Drawer title="Messages" placement="right" onClose={onClose} open={openDrawer}>
      <div className=" h-[90%] overflow-scroll overflow-x-hidden">
      {
        chats.map((chat, index) => {
          return (
            <div clas key={index} className={`${chat.userId === user.id ? 'bg-cyan-400' : 'bg-white'} shadow-md rounded-lg p-3 my-2 w-[90%]`}>
              {chat.name}: {chat.message}
            </div>
          )
        })
        }
      </div>
      <div className="flex justify-evenly w-full absolute bottom-3">
        <Input placeholder="Comment" className="relative right-3 h-16 bottom-2" style={{ width: "70%" }}
          onChange={(e) => setChatInput(e.target.value)}
          value={chatInput}
          onKeyDown={(e) => handleSubmitMessageByEnter(e)}
        />
        <Button className="bg-slate-300 mr-[20px]" icon={<SendOutlined />}
          onClick={() => handleSubmitMessage()}
        />
      </div>
    </Drawer>
  )
}

export default ChatModel
