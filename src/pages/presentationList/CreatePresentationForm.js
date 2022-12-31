import React from "react";
import { Button, Form, Input } from "antd";
import "antd/dist/antd.min.css";

export default function CreatePresentationForm({ handleSubmit }) {
  return (
    <>
      <div className="create-presentation-form">
        <Form layout="vertical" name="basic" onFinish={
          handleSubmit
        }>
          <Form.Item label="Presentation Name" name="name" initialValue={""} required>
            <Input placeholder="Presentation Name" required/>
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
