import React from "react";
import { Button, Form, Input } from "antd";
import "antd/dist/antd.min.css";

export default function CreateGroupForm({ handleSubmit }) {
  return (
    <>
      <div class="create-group-form">
        <Form layout="vertical" name="basic" onFinish={
          handleSubmit
        }>
          <Form.Item label="Group Name" name="name" initialValue={""} >
            <Input placeholder="Group Name" />
          </Form.Item>
          <Form.Item label="Group Description" name="description" initialValue={""} >
            <Input.TextArea rows={5} placeholder="Group Description" />
          </Form.Item>
          <Button type="primary" htmlType="submit" style={{
            width: "100%",
          }}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
