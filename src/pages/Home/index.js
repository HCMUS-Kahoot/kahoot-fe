import React from 'react'
import {Col, Image, Row,} from "antd"
function Home() {
  const groupList=[
    {
      image: "This is image",
      nameGroup: "WebNC",
      createdBy: "Tran Dac Toan"
    },
    {
      image: "This is image",
      nameGroup: "Kien truc phan mem",
      createdBy: "Dinh Huynh Tien Phu"
    }
  ]
  return (
    <div>
      <Row>
        <Col>
        </Col>
        <Col>
          <section className="bg-white rounded-sm">
            <p className="font-bold">Group</p>
            <hr />
            <div className="w-4/5 rounded-sm flex justify-center m-auto">
              <div className="w-full flex justify-start">
                <Image src={groupList[0].image}/>
                <p>{groupList[0].nameGroup}</p>
                <h1>{groupList[0].createdBy}</h1>
              </div>
            </div>
          </section>
        </Col>
      </Row>
    </div>
    
  )
}

export default Home
