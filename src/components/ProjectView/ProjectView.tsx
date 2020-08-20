import React from 'react';
import { Layout, Card, Table, Tag, Form, Select } from 'antd';
const { Sider, Content } = Layout;
const { Option } = Select;
interface ITask {
    key: string;
    title: string;
    assignee: string;
    status: IStatus;
    timeRemaining: string;
}
interface IStatus {
    label: string;
    color: string;
}

const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Assignee',
        dataIndex: 'assignee',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (status: IStatus) => <Tag color={status.color}>{status.label}</Tag>,
    },
    {
        title: 'Time Remaining',
        dataIndex: 'timeRemaining'
    }
];
const data: ITask[] = [
    {
        key: '1',
        title: 'Make the app',
        assignee: 'John',
        status: {
            color: 'green',
            label: 'Complete'
        },
        timeRemaining: 'Done'
    },
    {
        key: '2',
        title: 'Test the App',
        assignee: 'Sarah',
        status: {
            color: 'gold',
            label: 'In Progress'
        },
        timeRemaining: '7 Hours'
    },
    {
        key: '3',
        title: 'Write code tests',
        assignee: 'Unassigned',
        status: {
            color: 'red',
            label: 'Not Started'
        },
        timeRemaining: '2 Weeks'
    },
];

const ProjectView: React.FunctionComponent = () => {
    return (
        <div>
            <Card title="Tasks" size="small">
                <Table
                    size="middle"
                    columns={columns}
                    dataSource={data}
                />
            </Card>
        </div>
    );
};

export default ProjectView;
