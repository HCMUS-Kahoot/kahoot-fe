import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Menu, Modal, Row, Col, Card, message } from "antd";
import 'antd/dist/antd.less';
import { ExpandOutlined, CopyOutlined } from "@ant-design/icons";
import PostList from "./postList";
import MemberList from "./memberList";
import { createSocketWithHandlers } from "../../api/realtimeAPI";

export default function GroupDetail({ tab = "members" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams('id');
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();

  const [socket, setSocket] = useState(null);
  const [presenstingNow, setPresentingNow] = useState([]);
  useEffect(() => {
    const handleConnectSocket = () => {
      try {
        const actions = {
          connected: (data) => console.log(`Connected from ${params.id} with socket ID: `, data),
          error: (data) => console.log("Failed to connect socket: ", data),
          group_listen_room: (data) => {
            console.log("group_listen_room >>>", data);
            if (data.status === "end") {
              setPresentingNow((prev) => {
                const newPresentingNow = prev.filter((item) => item.id !== data.id);
                return newPresentingNow;
              });
            }
            else setPresentingNow((prev) => {
              const newPresentingNow = [...prev];
              newPresentingNow.push({
                id: data.id,
                title: data.presentation.title,
                pin: data.pin,
              });
              return newPresentingNow;
            });
          },
        }
        if (!socket) {
          setSocket(() => {
            const newSocket = createSocketWithHandlers(actions);
            newSocket.emit("groupListenRoom", { groupId: params.id });
            return newSocket;
          }
          );
        }
      } catch (error) {
        console.log("error", error);
      }
    }
    handleConnectSocket();
    return () => {
      if (socket) {
        console.log("disconnect socket");
        socket?.disconnect();
      }
    }
  }, []);
  return (
    <>
      <div className="mx-72">
        <div className="my-navbar shadow-sm rounded-md">
          <Menu mode="horizontal" defaultActiveFirst>


            <Menu.Item key="members" onClick={() => {
              navigate(`/groups/${params.id}`)
            }} >
              Members
            </Menu.Item>
            <Menu.Item key="posts" onClick={() => {
              navigate(`/groups/${params.id}/posts`)
            }} >
              Presentations
            </Menu.Item>
          </Menu>
        </div>
        <div className="body">
          <Row >
            <Col span={6}>
              <div className="m-4 shadow-sm rounded-md">
                <Card className="hover:shadow-xl" title="Class code" onClick={() => { showModal(); }} >
                  <span className="text-2xl text-green-600 font-bold cursor-pointer ">dhtpdt <ExpandOutlined className="relative bottom-2" /></span>
                </Card>
              </div>
            </Col>
            <Col span={18}>
              <div className="m-2 bg-white p-2 shadow-md rounded-md">
                {tab === "members" ? <MemberList groupId={params} /> : <PostList presenstingNow={presenstingNow} presentationTitle={"Presentation title"} presentationId={"idofpresentation"} isOwnerOfGroup={true} groupId={params.id} />}
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <Modal title="Class code" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="text-center text-green-600">
          <h1 className="font-bold text-5xl text-green-600">dhtpdt</h1>
          <hr />
          <span onClick={() => {
            navigator.clipboard.writeText(`${window.location.href}/invitation`);
            message.success("Copied to clipboard");
          }} className="text-green-600"> copy code <CopyOutlined /> </span>
        </div>
      </Modal>
    </>

  );
}
