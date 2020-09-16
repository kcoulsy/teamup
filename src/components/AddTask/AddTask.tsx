import React from 'react';
import { Form, Input, Select, InputNumber, AutoComplete, Button } from 'antd';
import { Project } from './../../types/project';
import { TaskStatus, taskStatusLabel } from '../../types/task';

const options = [
    { value: 'John Smith' },
    { value: 'Sarah Green' },
    { value: 'Bruce Michael' },
];

interface AddTaskProps {
    teamView: boolean;
    project?: Project;
    onAddTask: (task: any) => void; // TODO fix any
}

const AddTask: React.FunctionComponent<AddTaskProps> = ({
    teamView,
    onAddTask,
}) => {
    return (
        <>
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                layout="horizontal"
                onFinish={(values) => onAddTask(values)}>
                <Form.Item label="Title" name="title">
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input.TextArea />
                </Form.Item>
                {teamView ? (
                    <Form.Item label="Assignee" name="assignee">
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
                ) : null}
                <Form.Item label="Hours" name="estimatedHours">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Select" name="status">
                    <Select>
                        {Object.values(TaskStatus).map((status) => {
                            return (
                                <Select.Option key={status} value={status}>
                                    {taskStatusLabel[status]}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Task
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddTask;
