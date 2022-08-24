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
import { PERM_UPDATE_TEAM_MEMBERS } from '../../../constants/permissions';
import {
  PERM_INVITE_TEAM_MEMBERS,
  PERM_REMOVE_TEAM_MEMBERS,
} from './../../../constants/permissions';
import useTeams from '../../../hooks/useTeams';
import useUser from '../../../hooks/useUser';

const { Title, Link, Text } = Typography;
const { Option } = Select;

const TeamMembers = () => {
  const { data } = useUser();
  const loggedInUser = data?.user;
  const { hasPermission, team } = useTeams();
  const canUpdateTeamMembers = hasPermission(PERM_UPDATE_TEAM_MEMBERS);
  const canInviteTeamMembers = hasPermission(PERM_INVITE_TEAM_MEMBERS);
  const canRemoveTeamMembers = hasPermission(PERM_REMOVE_TEAM_MEMBERS);
  const [inviteForm] = Form.useForm();
  const members = team.users.map((user) => {
    return {
      key: user.id,
      name: user.email,
      roleIndex: team.roles.find((role) => role.userIDs.includes(user.id))?.id,
    };
  });

  let permissonErrorLabel: string | undefined = undefined;
  if (!canUpdateTeamMembers && !canRemoveTeamMembers) {
    permissonErrorLabel =
      'You do not have permissions to update or remove team members.';
  } else if (!canUpdateTeamMembers) {
    permissonErrorLabel = 'You do not have permissions to update team members.';
  } else if (!canRemoveTeamMembers) {
    permissonErrorLabel = 'You do not have permissions to remove team members.';
  }

  return (
    <div>
      <PageHeader
        title='Team Members'
        subTitle={permissonErrorLabel}
        className='team-settings__page-header'
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
            render: (_: any, record) => {
              const currentRoleName = team.roles.find(
                (role) => role.id === record.roleIndex
              )?.name;
              if (loggedInUser?.id !== record.key && canUpdateTeamMembers) {
                return (
                  <Select
                    defaultValue={currentRoleName}
                    onChange={async (value) => {
                      alert('Handle updating team role');
                      //   let newIndex = parseInt(value, 10);
                      //   const updated = await updateTeamMemberRole(
                      //     record.key,
                      //     newIndex
                      //   );
                      //   if (updated) {
                      //     notification.success({
                      //       message: `User ${record.name} updated to role ${roles[newIndex]}`,
                      //       placement: 'bottomRight',
                      //     });
                      //   }
                    }}>
                    {team.roles.map((role) => {
                      return (
                        <Option key={role.id} value={role.id}>
                          {role.name}
                        </Option>
                      );
                    })}
                  </Select>
                );
              }
              return currentRoleName;
            },
          },
          {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_: any, record) => {
              if (loggedInUser?.id !== record.key && canRemoveTeamMembers) {
                return (
                  <Space size='middle'>
                    <Link
                      onClick={async () => {
                        alert('handle remove team member');
                        // removeTeamUser(record.key).then(() => {
                        //   notification.success({
                        //     message: `${record.name} successfully removed from the team!`,
                        //     placement: 'bottomRight',
                        //   });
                        // });
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
        size='middle'
      />
      <Title level={4} className='team-team-members__invite-title'>
        Invite Member
      </Title>
      {canInviteTeamMembers ? (
        <Form
          form={inviteForm}
          layout='inline'
          name='invite'
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
          <Form.Item label='Email' name='email'>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
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

export default TeamMembers;
