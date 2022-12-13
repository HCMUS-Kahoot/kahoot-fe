import React from "react";
import { Row, Col, Button } from "antd";
import { SettingOutlined, PlayCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";

export default function PresentationChild({
    presentationName,
    owner,
    modified,
    created,

}) {
    return (
        <>
            <div className="m-1 hover:bg-gray-200 w-[98%] h-12 pt-2">
                {/* one row of presentation, with 4 collums to show presentation properties and one play button */}
                <Row>
                    <Col span={6} className="text-center font-bold text-black">
                        <Button type="primary" shape="circle" icon={<PlayCircleOutlined />} className="mr-3" />
                        {' '}{' '}{' '}
                        {presentationName}
                    </Col>
                    <Col span={5} className="text-center font-bold  text-gray-500">
                        {owner}
                    </Col>
                    <Col span={6} className="text-center font-bold   text-gray-500">
                        {modified}
                    </Col>
                    <Col span={6} className="text-center  font-bold  text-gray-500">
                        {created}
                    </Col>
                    <Col span={1} className="text-center  font-bold  text-gray-500">
                        <SettingOutlined />
                    </Col>


                </Row>

            </div>
        </>
    );
}
