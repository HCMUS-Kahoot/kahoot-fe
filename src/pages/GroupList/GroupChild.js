import React from "react";
import { Avatar, Card } from "antd";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";
const { Meta } = Card;

export default function GroupChild({
  groupName,
  groupDescription,
  groupImageSrc,
  creatorAvtarSrc,
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
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
          ]}
        >
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={groupName}
            description={groupDescription}
          />
        </Card>
      </div>
    </>
  );
}
