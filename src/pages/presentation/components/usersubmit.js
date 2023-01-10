import React, { useContext, useState, useEffect, useRef } from "react";

import { Context as RealtimeContext } from "../../../store/context/realtimeContext";
import { Drawer, Input, Button, notification } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

function UserSubmit({userSubmits, openDrawer, onClose, isNewChat, setIsNewChat }) {
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
    if (userSubmits.length > 0) {
      const lastChat = userSubmits[userSubmits.length - 1];
      if (lastChat.userId !== user.id && isNewChat) {
        openNotification(lastChat)
        setIsNewChat(false)
      }
    }
  }, [userSubmits, isNewChat])

  return (
    <Drawer title="User Submits" placement="left" onClose={onClose} open={openDrawer}>
      {
        userSubmits.map((submit, index) => {
          return (
            <div key={index} className=" p-3 border ">
              <b className="text-gray-400 font-serif"> {index + 1}</b> <b>{submit.name}:</b> todo for ha
              <i className="ml-5">       (at 10:12:12)</i>
              
            </div>
          )
        })
      }
    </Drawer>
  )
}

export default UserSubmit
