import React, { useState } from 'react';
import { Transfer, notification, PageHeader } from 'antd';
import { permissionLabels, PERM_UPDATE_TEAM_PERMS } from '../../../constants/permissions';

import useTeams from '../../../hooks/useTeams';

function RolePermissions() {
  const { team, hasPermission } = useTeams();
  const { roles } = team;
  // const updateTeamPermissions = () => alert('updateTeamPermissions');
  const canUpdatePermissions = hasPermission(PERM_UPDATE_TEAM_PERMS);
  const [selectedRoleIndex] = useState(0);
  const initialPermissions: string[] = [];
  // if (
  //     rolePermissions[selectedRoleIndex] &&
  //     rolePermissions[selectedRoleIndex].permissions
  // ) {
  //     initialPermissions = rolePermissions[selectedRoleIndex].permissions;
  // }
  const [targetKeys] = useState<string[]>(initialPermissions);
  const data = Object.entries(permissionLabels).map(([key, label]) => ({
    key,
    label,
  }));

  const handleTransferChange = async () => {
    // updateTeamPermissions();
    // if (updated) {
    //   setTargetKeys(targetKeys);
    notification.success({
      message: `Updated permissions for role ${roles[selectedRoleIndex]}`,
      placement: 'bottomRight',
    });
    // }
  };

  return (
    <div>
      <PageHeader
        title='Role Permissions'
        subTitle={
          !canUpdatePermissions
            ? 'You do not have permissions to modify role permissions but can see them.'
            : undefined
        }
        className='team-settings__page-header'
      />
      {/* {roles && roles.length > 0 && (
        <Select
          defaultValue={roles[0]}
          className='team-role-perms__role-select'
          onChange={handleSelectChange}>
          {roles.map((role) => {
            return (
              <Option key={role} value={role}>
                {role}
              </Option>
            );
          })}
        </Select>
      )} */}
      <Transfer
        disabled={!canUpdatePermissions}
        dataSource={data}
        showSearch
        listStyle={{
          width: '40%',
          height: 300,
        }}
        operations={['Add Role', 'Remove Role']}
        targetKeys={targetKeys}
        onChange={handleTransferChange}
        render={(item) => `${item.label}`}
      />
    </div>
  );
}

export default RolePermissions;
