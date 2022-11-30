import React from "react";
import { Col, Image, Row, Button } from "antd";
import { Link } from "react-router-dom";
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
    <div>
      <Row justify="space-between">
        <Col span={4}></Col>
        <Col span={12}>
          <section className="bg-white rounded-sm">
            <p className="font-bold ml-2 text-lg pt-2">Group</p>
            <hr />
            <div className="w-4/5 rounded-sm border-2 my-2 m-auto">
              <div className="w-full flex justify-around">
                <Image src={require("../../assets/images/Kahoot.png")} />
                <div>
                  <h1>{groupList[0].nameGroup}</h1>
                  <div>
                    <p>{groupList[0].createdBy}</p>
                  </div>
                  <div>
                    <p>{groupList[0].createdDate}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Link>
                <p className="font-bold color-[#1368CE]">
                  <u>See all</u>
                </p>
              </Link>
            </div>
          </section>
          <section className="bg-white rounded-sm">
            <p className="font-bold ml-2 text-lg pt-2">My kahoots</p>
            <hr />
            <div className="w-4/5 rounded-sm border-2 my-2 m-auto">
              <div className="w-full flex justify-around">
                <Image src={require("../../assets/images/Kahoot.png")} />
                <div>
                  <h1>{groupList[0].nameGroup}</h1>
                  <div>
                    <p>{groupList[0].createdBy}</p>
                  </div>
                  <div>
                    <p>{groupList[0].createdDate}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Link>
                <p className="font-bold color-[#1368CE]">
                  <u>See all</u>
                </p>
              </Link>
            </div>
          </section>
        </Col>
        <Col span={4}>
          <Button className="mb-4 w-full boder-2 rounded-md bg-[#1260BE]">
            Host Kahoot
          </Button>
          <section className="bg-white rounded-sm">
            <p className="font-bold ml-2 text-lg pt-2">Latest repost</p>
            <hr />
            <div className="w-4/5 rounded-sm border-2 my-2 m-auto">
              <div className="w-full flex justify-around">
                <Image src={require("../../assets/images/Kahoot.png")} />
                <div>
                  <h1>{groupList[0].nameGroup}</h1>
                  <div>
                    <p>{groupList[0].createdBy}</p>
                  </div>
                  <div>
                    <p>{groupList[0].createdDate}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Link>
                <p className="font-bold color-[#1368CE]">
                  <u>See all</u>
                </p>
              </Link>
            </div>
          </section>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
