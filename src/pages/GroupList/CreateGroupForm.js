import React from "react";
import { Form, Input } from "antd";
import 'antd/dist/antd.css';

export default function CreateGroupForm() {

    return (
        <>
            <div class="create-group-form">
                <Form layout="vertical" name="basic" initialValues={{ remember: true }}>
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
