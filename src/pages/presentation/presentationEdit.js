import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Select } from "antd";
import { useNavigate } from "react-router-dom";
import "./presentationEdit.css";
import "antd/dist/antd.min.css";
import PresentationMinimize from "./presentationMinimize";
import { DeleteOutlined, CopyOutlined, PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Slide from "./slide";
import { Brush } from "recharts";


export default function PresentationEdit() {
    const navigation = useNavigate();
    const [slides, setSlides] = useState([
        {
            type: "header",
            title: "Slide 1",
            content: {
                data: [
                    {
                        name: 'CHoice 1', pv: 1
                    },
                    {
                        name: 'Choice 2', pv: 2,
                    },
                    {
                        name: 'Choice 3', pv: 12,
                    },
                ],
                choices: ["Choice 1", "Choice 2", "Choice 3"]
            }
        }]);
    const [selectedSlide, setSelectedSlide] = useState(0);
    const RemoveSlide = (index) => {
        const newSlides = slides.filter((slide, i) => i !== index);
        setSlides(newSlides);
    }
    const DuplicateSlide = (index) => {
        const newSlides = [...slides];
        newSlides.splice(index, 0, newSlides[index]);
        setSlides(newSlides);
    }
    const SelectSlide = (index) => {
        setSelectedSlide(index);
    }
    const setSlide = (index, newSlide) => {
        const newSlides = [...slides];
        newSlides[index] = newSlide;
        setSlides(newSlides);
    }


    //disble scroll on body
    document.body.style.overflow = "hidden";

    return (
        <>
            <div className="full-height bg-white ">
                <div className="header text-center w-[100%] h-12 bg-white shadow-inner flex justify-between border-2 border-gray-100">
                    <Button className="float-left m-2 w-28 justify-self-end">
                        <ArrowLeftOutlined className="relative bottom-[4px]" /> Back
                    </Button>
                    <Button className="float-left m-2 w-28 justify-self-end" type="primary" onClick={() => {
                        document.body.style.overflow = "auto";
                        navigation("/presentations/as/show");
                    }}>Present</Button>

                </div>
                <Row className="fh">
                    <Col span={4} className="list-slides h-[100%] bg-white border-1 border-gray-600" >
                        <div className="list-slides-container overflow-auto h-[100%]">
                            {slides.map((slide, index) => (
                                <PresentationMinimize SelectSlide={SelectSlide} DuplicateSlide={DuplicateSlide} RemoveSlide={RemoveSlide} key={index} index={index} type={slide.type} title={slide.title} content={slide.content} />
                            ))}
                            <div className="m-5 shadow-md rounded-md text-7xl text-center cursor-pointer bg-white" onClick={
                                () => {
                                    setSlides([...slides, {
                                        type: "header",
                                        title: "Slide 1",
                                        content: {
                                            data: [
                                                {
                                                    name: 'Page A', pv: 1
                                                },
                                                {
                                                    name: 'Page B', pv: 2,
                                                },
                                                {
                                                    name: 'Page C', pv: 3,
                                                },
                                            ],
                                            choices: ["Choice 1", "Choice 2", "Choice 3"]
                                        }
                                    }])
                                }
                            }>
                                <PlusOutlined className="relative bottom-2" />
                            </div>
                        </div>
                    </Col>
                    <Slide index={selectedSlide} slide={slides[selectedSlide]} setSlide={setSlide} />
                </Row>
            </div>
        </>
    );
}
