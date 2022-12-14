import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Input, message } from "antd";
import "antd/dist/antd.min.css";


export default function PresentationPinInput() {
  const [pin, setPin] = useState("");
  const navigate = useNavigate();
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
              onClick={
                () => {
                  if (pin === "1234") {
                    message.success("Navigating to presentation...")
                    navigate(`/presentations/${pin}/choose`)
                  }
                  else {
                    message.error("Pin is incorrect")
                  }
                }
              }
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
