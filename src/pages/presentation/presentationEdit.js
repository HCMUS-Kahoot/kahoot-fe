import React, { useEffect, useState, useRef } from "react";
import { Button, Row, Col, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./presentationEdit.css";
import "antd/dist/antd.min.css";
import PresentationMinimize from "./presentationMinimize";
import { PlusOutlined, ArrowLeftOutlined, CheckOutlined } from "@ant-design/icons";
import Slide from "./slide";
import slideApi from "../../api/slideAPI";


export default function PresentationEdit() {
    const presentationId = useParams().id;
    const navigation = useNavigate();
    const [slides, setSlides] = useState([]);
    const deleteSlides = useRef([])
    const [useEffectTrigger, setUseEffectTrigger] = useState(false);

    function getSentData() {
        console.log("result before convert: ", slides)
        //create new array to avoid change original data
        const slides2 = Object.assign([], slides);
        const result = slides2.map(function(slide,index){
            //create new object to avoid change original data
            const dataItem = Object.assign({}, slide);
            dataItem.content = Object.assign({}, dataItem.content)
            dataItem.content.data = { ...dataItem.content.data }
            delete dataItem.content.data
            dataItem.content.detail = []
            dataItem.content.correctAnswer = 1;
            if (dataItem.slideType === "MultipleChoice") {
                const choices = Object.assign([], dataItem.content?.choices)
                dataItem.content.choices = choices.map(choiceData => {
                    dataItem.content.detail.push({ choiceContent: choiceData })
                })
                delete dataItem.content.choices
            }
            else if (dataItem.slideType === "Heading") {
                const heading = Object.assign({}, dataItem.content?.heading)
                dataItem.content.detail = [dataItem.content?.heading]
            }
            else if (dataItem.slideType === "Paragraph") { 
                const paragraph = Object.assign({}, dataItem.content?.paragraph)
                dataItem.content.detail = [dataItem.content?.paragraph]
            }
           // dataItem.slideIndex = index
            return dataItem
        })  
        console.log("result after convert: ", result)
        return result;
    }

    // function convertResDataToSlides(resData) {
    //     return resData.map((data) => {
    //         const dataItem = data;
    //         dataItem.content.choices = []
    //         data.content.data = []
    //         dataItem.content.detail.map((choiceData, index) => {
    //             dataItem.content.choices.push(choiceData.choiceContent)
    //             dataItem.content.data.push({ name: choiceData.choiceContent, pv: index })
    //         })
    //         delete dataItem.content.detail
    //         return dataItem
    //     })
    // }
    useEffect(() => {
        const getData = async () => {
            const presentationData = await slideApi.getSlideByPresentationId(presentationId)
            if (presentationData.length) {
                setSlides([...presentationData])
            }
            else {
                setSlides([{
                    slideType: "MultipleChoice",
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
                }])
            }

        }
        getData();
    }, [useEffectTrigger])
    const [selectedSlide, setSelectedSlide] = useState(0);
    const RemoveSlide = (index) => {
        console.log("delete is index: ", index);
        console.log("selectedSlide: ", selectedSlide)

        if (slides[index]._id) {
            deleteSlides.current.push(slides[index])
        }

        if (selectedSlide === index) {
            SelectSlide(index - 1 >= 0 ? index - 1 : 0);
        }

        const newSlides = slides.filter((slide, i) => i !== index);
        setSlides(newSlides);
        if (selectedSlide !== index) {
            setSelectedSlide(selectedSlide - 1 >= 0 ? selectedSlide - 1 : 0);
        }

        console.log("delete after is index: ", index);
        console.log("selectedSlide after: ", selectedSlide)
        console.log("slides after: ", newSlides)
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
    const backToPresentationsList = () => {
        navigation("/presentations")
    }
    const handleSaveEditSlide = async () => {
        let sentData = getSentData()
        if (deleteSlides.current.length !== 0) {
            deleteSlides.current.forEach(async (slide) => {
                console.log()
                if (slide._id) {
                    await slideApi.deleteSlide(slide._id)
                }
            });
            deleteSlides.current = []
        }
        await slideApi.saveSlidesChange(presentationId, sentData)
        //navigation(`/presentations/${presentationId}`)
        //window.location.reload();
        message.success("Save success")
        //setUseEffectTrigger(!useEffectTrigger)
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
                        navigation(`/presentations/${presentationId}/show`);
                    }}>Present</Button>
                    <Button className="float-left m-2 w-28 justify-self-end" onClick={handleSaveEditSlide}><CheckOutlined className="relative bottom-[4px]" />Save</Button>
                </div>
                <Row className="fh">
                    <Col span={4} className="list-slides h-[100%] bg-white border-1 border-gray-600" >
                        <div className="list-slides-container overflow-auto h-[100%]">
                            {slides.length && slides.map((slide, index) => (
                                <PresentationMinimize SelectSlide={SelectSlide} DuplicateSlide={DuplicateSlide} RemoveSlide={RemoveSlide} key={index} index={index} type={slide.slideType} title={slide.title ? slide.title : "test"} content={slide.content} selectedIndex={selectedSlide} />
                            ))
                            }
                            <div className="m-5 shadow-md rounded-md text-7xl text-center cursor-pointer bg-white" onClick={
                                () => {
                                    setSlides([...slides, {
                                        slideType: "MultipleChoice",
                                        title: `Slide ${slides.length + 1}`,
                                        content: {
                                            data: [
                                                {
                                                    name: 'Choice A', pv: 1
                                                },
                                                {
                                                    name: 'Choice B', pv: 1,
                                                },
                                                {
                                                    name: 'Choice C', pv: 1,
                                                },
                                            ],
                                            choices: ["Choice 1", "Choice 2", "Choice 3"],
                                            heading: "Heading",
                                            paragraph: "Your paragraph here"

                                        }
                                    }])
                                }
                            }>
                                <PlusOutlined className="relative bottom-2" />
                            </div>
                        </div >
                    </Col >
                    <Slide index={selectedSlide} slide={slides[selectedSlide]} setSlide={setSlide} />
                </Row >
            </div >
        </>
    );
}
