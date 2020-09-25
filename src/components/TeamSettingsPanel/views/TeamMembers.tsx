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
    PageHeader,
} from 'antd';
import { api } from './../../../services/api';
import { RootState } from '../../../store/configure';
import { connect } from 'react-redux';
import { updateTeamMemberRole } from '../../../actions/team';
import { User } from './../../../types/user';
import hasTeamRole from '../../../helpers/hasTeamRole';
import { PERM_UPDATE_TEAM_MEMBERS } from '../../../constants/permissions';
import {
    PERM_INVITE_TEAM_MEMBERS,
    PERM_REMOVE_TEAM_MEMBERS,
} from './../../../constants/permissions';

const { Title, Link, Text } = Typography;
const { Option } = Select;

interface TeamMemberTableRowData {
    key: string;
    name: string;
    roleIndex: number;
}

interface TeamMemberProps {
    teamMembers: any[];
    roles: string[];
    updateTeamMemberRole: Function;
    loggedInUser: User;
    canInviteTeamMembers: boolean;
    canUpdateTeamMembers: boolean;
    canRemoveTeamMembers: boolean;
}

const TeamMembers: React.FunctionComponent<TeamMemberProps> = ({
    teamMembers,
    roles,
    updateTeamMemberRole,
    loggedInUser,
    canInviteTeamMembers,
    canUpdateTeamMembers,
    canRemoveTeamMembers,
}) => {
    const [inviteForm] = Form.useForm();
    const members: TeamMemberTableRowData[] = teamMembers.map((teamMember) => {
        return {
            key: teamMember.user._id,
            name: teamMember.user.email,
            roleIndex: teamMember.roleIndex,
        };
    });
    let permissonErrorLabel: string | undefined = undefined;
    if (!canUpdateTeamMembers && !canRemoveTeamMembers) {
        permissonErrorLabel =
            'You do not have permissions to update or remove team members.';
    } else if (!canUpdateTeamMembers) {
        permissonErrorLabel =
            'You do not have permissions to update team members.';
    } else if (!canRemoveTeamMembers) {
        permissonErrorLabel =
            'You do not have permissions to remove team members.';
    }

    return (
        <div>
            <PageHeader
                title="Team Members"
                subTitle={permissonErrorLabel}
                style={{ padding: 0 }}
            />
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
                        render: (_: any, record: TeamMemberTableRowData) => {
                            if (
                                loggedInUser._id !== record.key &&
                                canUpdateTeamMembers
                            ) {
                                return (
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
                                                    placement: 'bottomRight',
                                                });
                                            }
                                        }}>
                                        {roles.map((role, index) => {
                                            return (
                                                <Option
                                                    key={role}
                                                    value={index}>
                                                    {role}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                );
                            }
                            return roles[record.roleIndex];
                        },
                    },
                    {
                        title: 'Actions',
                        dataIndex: 'actions',
                        key: 'actions',
                        render: (_: any, record: TeamMemberTableRowData) => {
                            if (
                                loggedInUser._id !== record.key &&
                                canRemoveTeamMembers
                            ) {
                                return (
                                    <Space size="middle">
                                        <Link
                                            onClick={() => {
                                                //TODO Remove the user from the team.
                                                notification.success({
                                                    message: `${record.name} successfully removed from the team!`,
                                                    placement: 'bottomRight',
                                                });
                                            }}>
                                            Remove
                                        </Link>
                                    </Space>
                                );
                            }
                            return null;
                        },
                    },
                ]}
                size="middle"
            />
            <Title level={4} style={{ marginBottom: '20px' }}>
                Invite Member
            </Title>
            {canInviteTeamMembers ? (
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
                                placement: 'bottomRight',
                            });
                        } else {
                            notification.error({
                                message: res.message,
                                placement: 'bottomRight',
                            });
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
            ) : (
                <Text>You do not have permissions to invite team members.</Text>
            )}
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    teamMembers: state.team.users,
    roles: state.team.roles,
    loggedInUser: state.user,
    canUpdateTeamMembers: hasTeamRole(state, PERM_UPDATE_TEAM_MEMBERS),
    canInviteTeamMembers: hasTeamRole(state, PERM_INVITE_TEAM_MEMBERS),
    canRemoveTeamMembers: hasTeamRole(state, PERM_REMOVE_TEAM_MEMBERS),
});

const mapDispatchToProps = {
    updateTeamMemberRole,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamMembers);
