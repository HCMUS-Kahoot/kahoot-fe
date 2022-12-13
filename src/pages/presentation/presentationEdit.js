import React, { useState } from "react";
import { Button, Row, Col, } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./presentationEdit.css";
import "antd/dist/antd.min.css";
import PresentationMinimize from "./presentationMinimize";
import { PlusOutlined, ArrowLeftOutlined, CheckOutlined } from "@ant-design/icons";
import Slide from "./slide";
import slideApi from "../../api/slideAPI";


export default function PresentationEdit() {
    const presentationId=useParams().id;
    const navigation = useNavigate();
    const [slides, setSlides] = useState([
        {
            slideType: "header",
            title: "Slide 1",
            content: {
                data: [
                    {
                        name: 'Choice 1', pv: 1
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
        if(selectedSlide===index)
        {
            setSelectedSlide(prevSelectedSlide=>prevSelectedSlide-1)
        }
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
    const backToPresentationsList =() => {
        navigation("/presentations")
    }
    function getSentDate(){
        return slides.map(data=>{
            const dataItem=data
            delete dataItem.content.data
            dataItem.content.detail=[]
            dataItem.content.choices.map(choiceData=>{
                dataItem.content.detail.push({choiceContent: choiceData})
            })
            delete dataItem.content.choices
            dataItem.content.correctAnswer=1;
            return dataItem
        })
    }
    const handleSaveEditSlide = async () => {
        console.log("This is slide before handle: ", slides)
        let sentData=getSentDate()
        await slideApi.saveSlidesChange(presentationId,sentData)
    }


    //disble scroll on body
    document.body.style.overflow = "hidden";

    return (
        <>
            <div className="full-height bg-white ">
                <div className="header text-center w-[100%] h-12 bg-white shadow-inner flex justify-between border-2 border-gray-100">
                    <Button className="float-left m-2 w-28 justify-self-end" onClick={backToPresentationsList}>
                        <ArrowLeftOutlined className="relative bottom-[4px]" /> Back
                    </Button>
                    <Button className="float-left m-2 w-28 justify-self-end" type="primary" onClick={() => {
                        document.body.style.overflow = "auto";
                        navigation("/presentations/as/show");
                    }}>Present</Button>
                    <Button className="float-left m-2 w-28 justify-self-end" onClick={handleSaveEditSlide}><CheckOutlined className="relative bottom-[4px]"/>Save</Button>
                </div>
                <Row className="fh">
                    <Col span={4} className="list-slides h-[100%] bg-white border-1 border-gray-600" >
                        <div className="list-slides-container overflow-auto h-[100%]">
                            {slides.map((slide, index) => (
                                <PresentationMinimize SelectSlide={SelectSlide} DuplicateSlide={DuplicateSlide} RemoveSlide={RemoveSlide} key={index} index={index} type={slide.slideType} title={slide.title?slide.title:"test"} content={slide.content} />
                            ))}
                            <div className="m-5 shadow-md rounded-md text-7xl text-center cursor-pointer bg-white" onClick={
                                () => {
                                    setSlides([...slides, {
                                        slideType: "header",
                                        title: `Slide ${slides.length+1}`,
                                        content: {
                                            data: [
                                                {
                                                    name: 'Choice A', pv: 1
                                                },
                                                {
                                                    name: 'Choice B', pv: 2,
                                                },
                                                {
                                                    name: 'Choice C', pv: 3,
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
