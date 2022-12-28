import React from "react";
import { Input, Button, Col, Select } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';


export default function Slide({ index, slide, setSlide }) {
    const slideIndex = index;
    return (
        <>
            <Col span={14} className="slide -blue-600 h-[100%]" >
                <div className="slide-container w-[100%] h-[100%] border-x-2 border-gray-200 bg-gray-200 flex justify-center">
                    <div className="slide w-[90%] h-[80%] bg-white text-center">
                        <div className="bg-gray-200 h-16" />
                        <div className="slide-title text-3xl font-bold text-center mb-7">
                            {slide?.title}
                        </div>
                        <div className="slide-content -gray-600 w-[100%] h-[70%]">
                            {slide?.slideType === "MultipleChoice" &&
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={slide?.content.data}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Bar dataKey="pv" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            }
                            {
                                slide?.slideType === "Heading" && <>
                                    <div className="text-7xl font-bold text-center mt-52">
                                        {slide?.content.heading}
                                    </div>
                                </>
                            }
                            {
                                slide?.slideType === "Paragraph" && <>
                                    <div className="text-2xl text-center mx-40 border h-[100%] p-6 shadow-md">
                                        {slide?.content.paragraph.split('\n\n').map(paragraph =>
                                            <p>
                                                {paragraph.split('\n').reduce((total, line) => [total, <br />, line])}
                                            </p>
                                        )}
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </Col>
            <Col span={6} className="slide -violet-700 h-[100%]" >
                <div className="slide-info-editor mt-3 px-3">
                    <div className="m-1">
                        <Select defaultValue="MultipleChoice" style={{ width: '100%' }} onChange={(value) => {
                            // slide.type = value
                            setSlide(slideIndex, { ...slide, slideType: value })
                        }} value={slide?.slideType}>
                            <Select.Option value="MultipleChoice">Multiple Choice</Select.Option>
                            <Select.Option value="Heading">Heading</Select.Option>
                            <Select.Option value="Paragraph">Paragraph</Select.Option>
                        </Select>
                    </div>
                    <div className="m-2 shadow-sm">
                        <Input placeholder="Title" onChange={(value) => {
                            //slide.title = value.target.value
                            setSlide(slideIndex, { ...slide, title: value.target.value })
                        }} value={slide?.title} />
                    </div>
                    {slide?.slideType === "MultipleChoice" &&
                        <div className="m-2 shadow-md text-center pb-3">
                            {slide?.content?.choices?.map((choice, index) => (
                                <div className="m-2  flex flex-row justify-center">
                                    <Input placeholder="Choice" onChange={(value) => {
                                        // slide.content.choices[index] = value.target.value
                                        // slide.content.data[index].name = value.target.value
                                        const newChoices = [...slide.content.choices];
                                        newChoices[index] = value.target.value;
                                        const newData = [...slide.content.data];
                                        newData[index].name = value.target.value;
                                        setSlide(slideIndex, { ...slide, content: { ...slide.content, choices: newChoices, data: newData } })
                                    }}
                                        value={slide.content.choices[index]} />
                                    <DeleteOutlined className="ml-3 mt-2 mr-2" onClick={() => {
                                        //remove choice
                                        const newChoices = slide.content.choices.filter((choice, i) => i !== index);
                                        const newData = slide.content.data.filter((choice, i) => i !== index);
                                        setSlide(slideIndex, { ...slide, content: { ...slide.content, choices: newChoices, data: newData } })
                                    }} />
                                </div>
                            ))}
                            <Button onClick={() => {
                                //add choice
                                const newChoices = [...slide.content.choices, ""];
                                const newData = [...slide.content.data, { name: "", pv: 0 }];
                                setSlide(slideIndex, { ...slide, content: { ...slide.content, choices: newChoices, data: newData } })
                            }}>Add Choice</Button>
                        </div>
                    }
                    {
                        slide?.slideType === "Heading" && <div className="m-2 shadow-md text-center pb-3">
                            <Input placeholder="Heading" onChange={(value) => {
                                //slide.content = value.target.value
                                setSlide(slideIndex, { ...slide, content: { ...slide.content, heading: value.target.value } })
                            }} value={slide?.content.heading} />
                        </div>
                    }
                    {
                        slide?.slideType === "Paragraph" && <div className="m-2 shadow-md text-center pb-3">
                            <Input.TextArea placeholder="Paragraph" onChange={(value) => {
                                //slide.content = value.target.value
                                setSlide(slideIndex, { ...slide, content: { ...slide.content, paragraph: value.target.value } })
                            }} value={slide?.content.paragraph} />
                        </div>
                    }
                </div>
            </Col>
        </>
    );
}

