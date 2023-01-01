import React, { useContext, useState, useEffect, useRef } from "react";

import { Context as RealtimeContext } from "../../../store/context/realtimeContext";
import { Drawer, Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

function ChatModel({ chats, openDrawer, onClose }) {
  const [chatInput, setChatInput] = useState('');
  const user = useSelector((state) => state.auth.login.currentUser);
  const { state, public_chat } = useContext(RealtimeContext);
  return (
    <Drawer title="Messages" placement="right" onClose={onClose} open={openDrawer}>
      {
        chats.map((chat, index) => {
          return (
            <div key={index} className={`${chat.userId === user.id ? 'bg-cyan-400' : 'bg-white'} shadow-md rounded-lg p-3 my-2 `}>
              {chat.name}: {chat.message}
            </div>
          )
        })
      }
      <div className="flex justify-evenly w-full absolute bottom-3">
        <Input placeholder="Comment" className="relative right-3" style={{ width: "70%" }}
          onChange={(e) => setChatInput(e.target.value)}
          value={chatInput}
        />
        <Button className="bg-slate-300" icon={<SendOutlined />}
          onClick={() => {
            public_chat({
              userId: user.id,
              message: chatInput,
              roomId: state?.room?.id
            })
            setChatInput('')
          }}
        />
      </div>
    </Drawer>
  )
}

export default ChatModel
