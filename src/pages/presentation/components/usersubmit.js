import React from "react";
import { Drawer } from "antd";

const formatDate = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const second = date.getSeconds();
  return `${hours}:${minutes}:${second}`;
}

function UserSubmit({ userSubmits, openDrawer, onClose, slides }) {

  return (
    <Drawer title="User Submits" placement="left" onClose={onClose} open={openDrawer}>
      {
        slides?.map((slide, index) => {
          return (
            <div key={index} className=" p-3 border ">
              <b className="p-2 text-gray-400 font-serif"> {index + 1}</b>
              <b>{slide.title}:</b>
              <br />
              {
                userSubmits?.map((submit) => {
                  if (submit.slideIndex === index)
                    return (
                      <div key={index} className=" p-3 border ">
                        <b>{submit.username}:</b> {submit.choice}
                        <i className="ml-5">       (at {formatDate(new Date(submit.time))})</i>
                      </div>
                    )
                })
              }
            </div>
          )
        })}
    </Drawer>
  )
}

export default UserSubmit
