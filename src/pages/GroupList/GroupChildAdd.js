import React from "react";
import { Card } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
const { Meta } = Card;

export default function GroupChildAdd() {

    return (
        <>
            <div class="m-3 shadow-md hover:shadow-2xl">
                <Card
                    style={{
                        width: 300,
                        padding: 10,
                    }}
                    cover={
                        <PlusOutlined style={{ fontSize: '100px', color: '#08c' }} />
                    }
                >
                    <Meta
                        // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title="Add group"
                    />
                </Card>
            </div>
        </>
    );
}
