import React from "react";
import { Form, Input } from "antd";
import "antd/dist/antd.min.css";

export default function CreateGroupForm({ handleSubmit }) {
  return (
    <>
      <div class="create-group-form">
        <Form layout="vertical" name="basic" onFinish={handleSubmit}>
          <Form.Item label="Group Name">
            <Input placeholder="Group Name" />
          </Form.Item>
          <Form.Item label="Group Description">
            <Input.TextArea rows={5} placeholder="Group Description" />
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
