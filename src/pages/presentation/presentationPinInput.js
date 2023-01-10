import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Input, message } from "antd";
import "antd/dist/antd.min.css";
import { useSelector } from "react-redux";
import { Context as RealtimeContext } from "../../store/context/realtimeContext";

export default function PresentationPinInput() {
  const [pin, setPin] = useState("");
  const navigate = useNavigate();
  const { state, initialize_socket, disconnect_socket, check_user_can_join_room } = useContext(RealtimeContext);
  const user = useSelector((state) => state.auth.login.currentUser);
  useEffect(() => {
    const handleConnectSocket = async () => {
      try {
        const actions = {
          connected: (data) => console.log("Connected with socket ID: ", data),
          error: (data) => console.log("Failed to connect socket: ", data),

          error_join_room: (data) => {
            console.log("event: 'error_join_room' received: ", data)
            message.error(data.message)
            navigate("/")
          },
          check_user_can_join_room: (data) => {
            console.log("event: 'join_room_by_pin_success' received: ", data)
            if (data.status === "OK") {
              message.success("Join successfully")
              if (!data.role || data.role === "member") {
                navigate(`/presentations/${data.pin}/choose`)
              }
              else {
                navigate(`/presentations/${data.pin}/show`)
              }
            }
            else {
              message.error(data.message)
            }
          }
        }
        await initialize_socket(actions)

      } catch (error) {
        console.log(error);
      }
    };
    handleConnectSocket();

    return () => {
      console.log("disconnecting socket")
      disconnect_socket()
    }
  }, [])
  const handleSubmitPin = async () => {
    try {
      await check_user_can_join_room({
        userId: user.id,
        pin: pin,
      })
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <>

      <Col span={24} className="slide h-[100%] bg-gray-200 text-center flex justify-center flex-row " >
        <div className="h-6" />
        <div className=" border-2 border-gray-400 h-[60%] w-[60%] ml-[20%] bg-white">
          <br />
          <br />
          <br />
          <div className="h-6 text-center font-bold text-3xl text-gray-400" >
            Please input your pin
          </div>
          <div className="slide-content -gray-600 w-[90%] h-[60%] bg-white">
            <br />
            <br />
            <br />

            <Input
              onChange={(e) => {
                setPin(e.target.value);
              }}

              className="rounded-md" style={{
                height: '100px',
                width: '80%',
                marginLeft: '10%',
                borderRadius: '10px',
              }}
              size="large" placeholder="pin code" />
            <br />
            <br />
            <br />
            <br />
            <Button className="rounded-md"
              onClick={handleSubmitPin}
              style={{
                marginLeft: '10%',
                width: '60%',
                borderRadius: '5px',
              }} type="primary">Submit</Button>
          </div>
        </div>
      </Col>
    </>
  )
}
