import React from "react";
import { Avatar, Card } from "antd";
import { EditOutlined, SettingOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";
import { Link } from "react-router-dom";
import groupApi from "../../api/groupAPI";
const { Meta } = Card;

export default function GroupChild({
  groupName,
  groupDescription,
  groupImageSrc,
  creatorAvtarSrc,
  group,
  setUseEffectTrigger,
  useEffectTrigger
}) {
  return (
    <>
      <div className="m-3 shadow-md hover:shadow-2xl">
        <Card
          style={{
            width: 300,
            padding: 10,
          }}
          cover={
            <Link to={`/groups/${group._id}`}>

            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            </Link>

          }
          actions={[
            <DeleteOutlined key="delete" onClick={async () => { 
              try {
                const res = await groupApi.deleteGroup(group._id);
                console.log(res);
                setUseEffectTrigger(!useEffectTrigger);
              } catch (error) {
                console.log("Delete group error", error);
              }
              
            }} />,
            <EditOutlined key="edit" />,
          ]}
        >
          <Meta
            avatar={
              <Link to={`/groups/${group._id}`}>
                <Avatar src="https://joeschmoe.io/api/v1/random" />
              </Link>
            
            }
            title={groupName}
            description={groupDescription}
          />
        </Card>
      </div>
    </>
  );
}
