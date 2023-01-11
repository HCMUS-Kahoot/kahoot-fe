import React from "react";
import { Col, Image, Row, Button, Carousel } from "antd";
import { PicCenterOutlined, GroupOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import '../Home/home.css'
function Home() {
  const groupList = [
    {
      image: "This is image",
      nameGroup: "WebNC",
      createdBy: "Tran Dac Toan",
      createdDate: Date.now().toString(),
    },
    {
      image: "This is image",
      nameGroup: "Kien truc phan mem",
      createdBy: "Dinh Huynh Tien Phu",
    },
  ];
  return (
    <div  >
      <Row>
        <Col span={16}>
          <div className="homepage-container bg-white text-center">
            <div className="carousel-container w-[90%] ml-[5%]">
              <Carousel autoplay className="py-6 mt-14" style={{
                width: "100%",
              }}>
                <div className="w-full ">
                  <div className="flex justify-center ">
                    <Image width={1080} src={require("../../assets/images/home1.png")} />
                  </div>
                </div>
                <div className="w-full ">
                  <div className="flex justify-center">
                    <Image width={1080} src={require("../../assets/images/home2.png")} />
                  </div>
                </div>
                <div className="w-full ">
                  <div className="flex justify-center ">
                    <Image width={1080} src={require("../../assets/images/home3.png")} />
                  </div>
                </div>
              </Carousel>

            </div>
          </div>
        </Col>
        <Col span={8}>
          <h1 className="font-mono text-8xl mt-36" >Hi there</h1>
          <h1 className="font-mono text-xl mt-[-30px]" >Ready for a mind-blowing experience? </h1>

          <div className="flex justify-start mt-24">
            <Link to="/groups">
              <div className="mx-8 bg-orange-100  hover:scale-125 shadow-lg hover:relative hover:bottom-10 text-orange-500 font-bold py-2 px-4 rounded">
                <GroupOutlined className="text-6xl font-thin m-10" />
                <br />
                Groups
                <br />
              </div>
            </Link>
            <Link to="/presentations">
              <div className="mx-8 bg-blue-100  hover:scale-125 shadow-lg hover:relative hover:bottom-10 text-blue-500 font-bold py-2 px-4 rounded">
                <PicCenterOutlined className="text-6xl font-thin m-10" />
                <br />
                Presentations
                <br />
              </div>
            </Link>

          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
