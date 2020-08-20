import React from 'react';
import { Form, Input, Button, Typography } from 'antd';

const { Title } = Typography;

const GeneralSettings: React.FunctionComponent = (props) => {
    return (
        <div>
            <Title level={4} style={{ marginBottom: '20px' }}>
                General Settings
            </Title>
            <Form
                labelCol={{
                    sm: {
                        span: 24,
                    },
                    md: {
                        span: 8,
                    },
                }}
                wrapperCol={{
                    sm: {
                        span: 24,
                    },
                    md: {
                        span: 12,
                    },
                }}
                name="teamGeneral"
                initialValues={{ remember: true }}>
                <Form.Item label="Team Name" name="teamName">
                    <Input />
                </Form.Item>

                <Form.Item label="Team Description" name="teamDesc">
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        md: {
                            offset: 8,
                            span: 16,
                        },
                        sm: {
                            offset: 0,
                            span: 16,
                        },
                    }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default GeneralSettings;
