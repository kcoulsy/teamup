import React from 'react';
import { Card, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { User } from '@prisma/client';
import { TaskRow, TaskStatusColor } from '../../types/task';

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
    render: (assignee: User) => assignee.email || 'Unassigned',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status: TaskStatusColor) => (
      <Tag color={status.color}>{status.label}</Tag>
    ),
  },
  {
    title: 'Time Remaining',
    dataIndex: 'timeRemaining',
  },
];

function ProjectView() {
  const tasks = [] as TaskRow[];
  return (
    <div>
      <Card title='Tasks' size='small'>
        <Table size='middle' columns={columns} dataSource={tasks} />
      </Card>
    </div>
  );
}

export default ProjectView;
