import React, { useState } from "react";
import { Button, Col, } from "antd";
import "antd/dist/antd.min.css";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';


export default function PresentationChoose() {
    //todo: let member to submit questions and comments
    const presentation = {
        slides: [
            {
                title: "Slide 1",
                slideType: "Multiple Choice",
                content: {
                    choices: ["Choice 1", "Choice 2", "Choice 3"],
                    data: [
                        { name: "Choice 1", pv: 2400, amt: 2400 },
                        { name: "Choice 2", pv: 1398, amt: 2210 },
                        { name: "Choice 3", pv: 9800, amt: 2290 },
                    ]
                }
            },
            {
                title: "Slide 2",
                slideType: "Multiple Choice",
                content: {
                    choices: ["Choice 1", "Choice 2", "Choice 3"],
                    data: [
                        { name: "Choice 1", pv: 2400, amt: 2400 },
                        { name: "Choice 2", pv: 1398, amt: 2210 },
                        { name: "Choice 3", pv: 9800, amt: 2290 },
                    ]
                }
            },
        ]
    }

    const presentationData = presentation
    const [slides, setSlides] = useState(presentationData.slides)
    const [slideIndex, setSlideIndex] = useState(0)
    const [slide, setSlide] = useState(slides[slideIndex])
    return (
        <>

            <Col span={24} className="slide h-[100%] bg-gray-200 text-center flex justify-center flex-row " >
                <div className="h-6" />
                <div className=" border-2 border-gray-400 h-[60%] w-[60%] ml-[20%] bg-white">
                    <div className="h-6 text-center font-bold text-gray-400" >
                        select answer and click submit
                    </div>
                    <div className="slide-title text-3xl font-bold text-center mb-7 bg-white">
                        {slide.title}
                    </div>
                    <div className="slide-content -gray-600 w-[90%] h-[60%] bg-white">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={slide.content.data}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Bar dataKey="pv" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="slide-info-editor mt-3 absolute bottom-[0px] border-t-2 border-gray-300 shadow-inner w-full h-52 bg-white flex flex-col justify-center" >
                    <div>
                        <div className="flex justify-center items-center w-full">
                            <div className="flex flex-wrap flex-row items-center w-[60%]">
                                <Button className="w-64 mx-3 my-1" > Option 1 </Button>
                                <Button className="w-64 mx-3 my-1" > Option 1 </Button>
                                <Button className="w-64 mx-3 my-1" > Option 1 </Button>
                                <Button className="w-64 mx-3 my-1" > Option 1 </Button>
                            </div >
                        </div>
                        <Button className="mt-5" type="primary" >Submit</Button>
                    </div>

                </div>
            </Col>
        </>
    );
}
