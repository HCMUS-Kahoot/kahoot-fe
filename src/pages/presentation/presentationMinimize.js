import React, { useState } from "react";
import { DeleteOutlined, CopyOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";


export default function PresentationMinimize({ SelectSlide, DuplicateSlide, RemoveSlide, index, type, title, content, selectedIndex }) {
    const [showIcons, setShowIcons] = useState(false);
    const isSelecting = selectedIndex === index;

    return (
        <>
            <div className="bg-white my-2 shadow-sm cursor-pointer" onMouseOver={
                () => setShowIcons(true)
            }
                onMouseLeave={
                    () => setShowIcons(false)
                }
                onClick={() => SelectSlide(index)}
                style={{
                    backgroundColor: isSelecting ? "#e6f7ff" : "white",
                }}
            >

                <div className="font-bold pl-3"> {title} </div>
                <div className=" m-3 rounded-sm shadow-md text-center bg-gray-100 ml-5">
                    <div>{type}</div>
                </div>
                <div className="h-6 flex justify-items-start justify-start ml-3"  >
                    <DeleteOutlined style={{
                        display: showIcons ? "block" : "none",
                        marginLeft: "10px"
                    }}
                        onClick={() => RemoveSlide(index)}
                    />
                    <CopyOutlined style={{
                        display: showIcons ? "block" : "none",
                        marginLeft: "5px"
                    }}
                        onClick={() => DuplicateSlide(index)}
                    />
                </div>
            </div>
        </>
    );
}
