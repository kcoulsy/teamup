import React, { useState } from 'react';
import {
    Form,
    Input,
    Select,
    DatePicker,
    InputNumber,
    AutoComplete,
} from 'antd';

const options = [
    { value: 'John Smith' },
    { value: 'Sarah Green' },
    { value: 'Bruce Michael' },
];

const AddTask: React.FunctionComponent = () => {
    return (
        <>
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                layout="horizontal">
                <Form.Item label="Title">
                    <Input />
                </Form.Item>
                <Form.Item label="Description">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item label="Assignee">
                    <AutoComplete
                        placeholder="Type a name here"
                        filterOption={(inputValue, option) =>
                            option?.value
                                .toUpperCase()
                                .indexOf(inputValue.toUpperCase()) !== -1
                        }
                        options={options}
                    />
                </Form.Item>
                <Form.Item label="Hours">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Start Date">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Select">
                    <Select defaultValue="not_started">
                        <Select.Option value="not_started">
                            Not Started
                        </Select.Option>
                        <Select.Option value="in_progress">
                            In Progress
                        </Select.Option>
                        <Select.Option value="pending_review">
                            Pending Review
                        </Select.Option>
                        <Select.Option value="testing">Testing</Select.Option>
                        <Select.Option value="done">Done</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddTask;
