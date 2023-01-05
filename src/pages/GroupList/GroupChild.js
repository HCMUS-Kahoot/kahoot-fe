import React,{useState} from "react";
import { Avatar, Card,Modal,message } from "antd";
import { EditOutlined, SettingOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";
import { Link } from "react-router-dom";
import groupApi from "../../api/groupAPI";
import CreateGroupForm from "./CreateGroupForm";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const editGroup = async (values) => {
    try {
      console.log("valuse edit gr",values)
      if (values.groupname === "") {
        message.error("Group name can't be empty");
        return;
      }
      if (values.groupdes === "") {
        message.error("Group description can't be empty");
        return;
      }
      const res = await groupApi.updateGroup(group._id,values.name, values.description);
      console.log(res);

      message.success("Edit group successfully");
      setIsModalOpen(false);
      setUseEffectTrigger(!useEffectTrigger);

    } catch (error) {
      message.error(error.message);
    }

  };
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
            <EditOutlined key="edit" onClick={() => { 
              setIsModalOpen(true);
            }} />,
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
        <Modal
          title="Edit group"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <CreateGroupForm handleSubmit={editGroup} defaultName={group.name} defaultDescription={groupDescription} />
        </Modal>
      </div>
    </>
  );
}
