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
import { RootState } from '../../../store/configure';
import { connect } from 'react-redux';
import { updateTeamMemberRole } from '../../../actions/team';

const { Title, Link } = Typography;
const { Option } = Select;

interface TeamMemberTableRowData {
    key: string;
    name: string;
    roleIndex: number;
}

const TeamMembers: React.FunctionComponent<{
    teamMembers: any[];
    roles: string[];
    updateTeamMemberRole: Function;
}> = ({ teamMembers, roles, updateTeamMemberRole }) => {
    const [inviteForm] = Form.useForm();
    const members: TeamMemberTableRowData[] = teamMembers.map((teamMember) => {
        return {
            key: teamMember.user._id,
            name: teamMember.user.email,
            roleIndex: teamMember.roleIndex,
        };
    });
    return (
        <div>
            <Title level={4} style={{ marginBottom: '20px' }}>
                Team Members
            </Title>
            <Table
                dataSource={members}
                columns={[
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
                            <Select
                                defaultValue={roles[record.roleIndex]}
                                onChange={async (value) => {
                                    let newIndex = parseInt(value, 10);
                                    const updated = await updateTeamMemberRole(
                                        record.key,
                                        newIndex
                                    );
                                    if (updated) {
                                        notification.success({
                                            message: `User ${record.name} updated to role ${roles[newIndex]}`,
                                        });
                                    }
                                }}>
                                {roles.map((role, index) => {
                                    return (
                                        <Option key={role} value={index}>
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
                                <Link
                                    onClick={() => {
                                        notification.success({
                                            message: `${record.name} successfully removed from the team!`,
                                        });
                                    }}>
                                    Remove
                                </Link>
                            </Space>
                        ),
                    },
                ]}
                size="middle"
            />
            ;
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

const mapStateToProps = (state: RootState) => ({
    teamMembers: state.team.members,
    roles: state.team.roles,
});

const mapDispatchToProps = {
    updateTeamMemberRole,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamMembers);
