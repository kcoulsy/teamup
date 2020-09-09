import React from 'react';
import {
    Table,
    Typography,
    Space,
    Select,
    Form,
    Input,
    Button,
    notification,
} from 'antd';
import { api } from './../../../services/api';

const { Title, Link } = Typography;
const { Option } = Select;

interface TeamMemberTableRowData {
    key: string;
    name: string;
    role: string;
}

const roles = [
    'Project Manager',
    'Quality Assurance',
    'Business Analyst',
    'Developer',
];

const dataSource: TeamMemberTableRowData[] = [
    {
        key: '1',
        name: 'Mike',
        role: roles[0],
    },
    {
        key: '2',
        name: 'John',
        role: roles[1],
    },
    {
        key: '3',
        name: 'Sarah',
        role: roles[2],
    },
    {
        key: '4',
        name: 'Joe',
        role: roles[3],
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        render: (_: any, record: TeamMemberTableRowData) => (
            <Select defaultValue={record.role}>
                {roles.map((role) => {
                    return (
                        <Option key={role} value={role}>
                            {role}
                        </Option>
                    );
                })}
            </Select>
        ),
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: (_: any, record: TeamMemberTableRowData) => (
            <Space size="middle">
                <Link>Remove</Link>
            </Space>
        ),
    },
];

const TeamMembers: React.FunctionComponent = (props) => {
    const [inviteForm] = Form.useForm();
    return (
        <div>
            <Title level={4} style={{ marginBottom: '20px' }}>
                Team Members
            </Title>
            <Table dataSource={dataSource} columns={columns} size="middle" />;
            <Title level={4} style={{ marginBottom: '20px' }}>
                Invite Member
            </Title>
            <Form
                form={inviteForm}
                layout="inline"
                name="invite"
                initialValues={{ remember: true }}
                onFinish={async (values) => {
                    const res = await api('/team/invite', 'POST', {
                        email: values.email,
                    });

                    if (res.success) {
                        notification.success({
                            message: res.message,
                        });
                    } else {
                        notification.error({ message: res.message });
                    }
                    inviteForm.resetFields();
                }}>
                <Form.Item label="Email" name="email">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Invite
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default TeamMembers;
