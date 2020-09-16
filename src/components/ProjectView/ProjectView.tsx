import React from 'react';
import { Card, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';

export interface ITask {
    key: string;
    title: {
        label: string;
        projectId: string;
        taskId: string;
    };
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
        render: ({
            label,
            projectId,
            taskId,
        }: {
            label: string;
            projectId: string;
            taskId: string;
        }) => <Link to={`/project/${projectId}/task/${taskId}`}>{label}</Link>,
    },
    {
        title: 'Assignee',
        dataIndex: 'assignee',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (status: IStatus) => (
            <Tag color={status.color}>{status.label}</Tag>
        ),
    },
    {
        title: 'Time Remaining',
        dataIndex: 'timeRemaining',
    },
];

const ProjectView: React.FunctionComponent<{ tasks: ITask[] }> = ({
    tasks,
}) => {
    return (
        <div>
            <Card title="Tasks" size="small">
                <Table size="middle" columns={columns} dataSource={tasks} />
            </Card>
        </div>
    );
};

export default ProjectView;
