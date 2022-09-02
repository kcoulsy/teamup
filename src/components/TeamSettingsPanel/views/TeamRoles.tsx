import React, { useState } from 'react';
import { Form, Input, Button, notification, PageHeader } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { PERM_UPDATE_TEAM_ROLES } from '../../../constants/permissions';
import { Role } from '../../../../server/node_modules/@prisma/client';
import useTeams from '../../../hooks/useTeams';

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const TeamRoles = () => {
  const [localRoles, setLocalRoles] = useState<Role[]>([]);
  const { updateRolesMutation, hasPermission } = useTeams({
    onSuccess: ([team]) => setLocalRoles(team.roles),
  });

  const canUpdateTeamRoles = hasPermission(PERM_UPDATE_TEAM_ROLES);

  const updateRoles = async () => {
    try {
      const updatedRoles = localRoles.map((role, index) => ({
        ...role,
        order: index * 10,
      }));
      await updateRolesMutation.mutate(updatedRoles);

      notification.success({
        message: 'Roles successfully updated!',
        placement: 'bottomRight',
      });
    } catch (e) {
      notification.error({
        message: 'Something went wrong updating roles!',
        placement: 'bottomRight',
      });
    }
  };

  return (
    <div>
      <PageHeader
        title='Team Roles'
        subTitle={
          !canUpdateTeamRoles
            ? 'You do not have permissions to modify role permissions but can see them.'
            : undefined
        }
        className='team-settings__page-header'
      />
      <Form name='dynamic_form_item' {...formItemLayoutWithOutLabel}>
        {localRoles.map((role, index) => {
          return (
            <Form.Item {...formItemLayoutWithOutLabel} key={role.id}>
              <Form.Item noStyle>
                <Input
                  placeholder='Role Name'
                  className='team-team-roles__input'
                  value={role.name}
                  disabled={!canUpdateTeamRoles}
                  onChange={(ev) => {
                    console.log('updated role', role);
                    const newRole = { ...role, name: ev.target.value };
                    const newRoles = localRoles.map((r) => {
                      if (r.id === role.id) {
                        return newRole;
                      }
                      return r;
                    });
                    setLocalRoles(newRoles);
                  }}
                />
              </Form.Item>
              {index !== 0 && canUpdateTeamRoles ? (
                <MinusCircleOutlined
                  className='dynamic-delete-button team-team-roles__delete-icon'
                  onClick={() => {
                    setLocalRoles(
                      localRoles.filter(({ id }) => id !== role.id)
                    );
                  }}
                />
              ) : null}
            </Form.Item>
          );
        })}
        {canUpdateTeamRoles ? (
          <Form.Item>
            <Button
              type='dashed'
              onClick={() => {
                setLocalRoles([
                  // @ts-ignore TODO: fix this
                  ...localRoles,
                  // @ts-ignore TODO: fix this
                  {
                    name: '',
                    id: 'TEMP_ID' + Date.now(),
                    permissions: [],
                    order: 0,
                  },
                ]);
              }}
              style={{ width: '60%' }}>
              <PlusOutlined /> Add Role
            </Button>
          </Form.Item>
        ) : null}
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            disabled={!canUpdateTeamRoles}
            loading={updateRolesMutation.isLoading}
            onClick={updateRoles}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TeamRoles;
