import React, { useState } from 'react';
import { Transfer, Select, notification, PageHeader } from 'antd';
import { permissionLabels } from '../../../constants/permissions';
import { connect } from 'react-redux';
import { RootState } from '../../../store/configure';
import { updateTeamPermissions } from './../../../actions/team';
import hasTeamRole from '../../../helpers/hasTeamRole';
import { PERM_UPDATE_TEAM_PERMS } from './../../../constants/permissions';
import { RolePermission } from '../../../types/team';

const { Option } = Select;

interface RolePermissionsProps {
    canUpdatePermissions: boolean;
    roles: string[];
    rolePermissions: RolePermission[];
    updateTeamPermissions: Function;
}
const RolePermissions: React.FunctionComponent<RolePermissionsProps> = ({
    canUpdatePermissions,
    roles,
    rolePermissions,
    updateTeamPermissions,
}) => {
    const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
    let initialPermissions: string[] = [];
    if (
        rolePermissions[selectedRoleIndex] &&
        rolePermissions[selectedRoleIndex].permissions
    ) {
        initialPermissions = rolePermissions[selectedRoleIndex].permissions;
    }
    const [targetKeys, setTargetKeys] = useState<string[]>(initialPermissions);
    const data = Object.entries(permissionLabels).map(([key, label]) => {
        return {
            key,
            label,
        };
    });

    const handleSelectChange = async (value: any) => {
        const index = roles.indexOf(value);

        setSelectedRoleIndex(index);
        if (rolePermissions[index]) {
            setTargetKeys(rolePermissions[index].permissions);
        } else {
            setTargetKeys([]);
        }
    };

    const handleTransferChange = async (targetKeys: string[]) => {
        const updated = updateTeamPermissions(selectedRoleIndex, targetKeys);
        if (updated) {
            setTargetKeys(targetKeys);
            notification.success({
                message: `Updated permissions for role ${roles[selectedRoleIndex]}`,
                placement: 'bottomRight',
            });
        }
    };

    return (
        <div>
            <PageHeader
                title="Role Permissions"
                subTitle={
                    !canUpdatePermissions
                        ? 'You do not have permissions to modify role permissions but can see them.'
                        : undefined
                }
                className="team-settings__page-header"
            />
            <Select
                defaultValue={roles[selectedRoleIndex]}
                className="team-role-perms__role-select"
                onChange={handleSelectChange}>
                {roles.map((role) => {
                    return (
                        <Option key={role} value={role}>
                            {role}
                        </Option>
                    );
                })}
            </Select>
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
};

const mapStateToProps = (state: RootState) => ({
    canUpdatePermissions: hasTeamRole(state, PERM_UPDATE_TEAM_PERMS),
    roles: state.team.roles,
    rolePermissions: state.team.rolePermissions,
});

const mapDispatchToProps = {
    updateTeamPermissions,
};
export default connect(mapStateToProps, mapDispatchToProps)(RolePermissions);
