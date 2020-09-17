import React, { useState } from 'react';
import { Transfer, Typography, Select, notification } from 'antd';
import PERMISSIONS, { permissionLabels } from '../../../constants/permissions';
import { connect } from 'react-redux';
import { RootState } from '../../../store/configure';
import { api } from './../../../services/api';
import { updateTeamPermissions } from './../../../actions/team';

const { Title } = Typography;
const { Option } = Select;

interface RolePermissionsProps {
    roles: any[]; // TODO change within state
    rolePermissions: any[];
    updateTeamPermissions: Function;
}
const RolePermissions: React.FunctionComponent<RolePermissionsProps> = ({
    roles,
    rolePermissions,
    updateTeamPermissions,
}) => {
    const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
    let initialPermissions = [];
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

    return (
        <div>
            <Title level={4} style={{ marginBottom: '20px' }}>
                Role Permissions
            </Title>
            <Select
                defaultValue={roles[selectedRoleIndex]}
                style={{ marginBottom: '20px' }}
                onChange={async (value) => {
                    const index = roles.indexOf(value);

                    setSelectedRoleIndex(index);
                    if (rolePermissions[index]) {
                        setTargetKeys(rolePermissions[index].permissions);
                    } else {
                        setTargetKeys([]);
                    }
                }}>
                {roles.map((role) => {
                    return (
                        <Option key={role} value={role}>
                            {role}
                        </Option>
                    );
                })}
            </Select>
            <Transfer
                dataSource={data}
                showSearch
                listStyle={{
                    width: '40%',
                    height: 300,
                }}
                operations={['Add Role', 'Remove Role']}
                targetKeys={targetKeys}
                onChange={async (targetKeys) => {
                    const updated = updateTeamPermissions(
                        selectedRoleIndex,
                        targetKeys
                    );
                    if (updated) {
                        setTargetKeys(targetKeys);
                        notification.success({
                            message: `Updated permissions for role ${roles[selectedRoleIndex]}`,
                        });
                    }
                }}
                render={(item) => `${item.label}`}
            />
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    roles: state.team.roles,
    rolePermissions: state.team.rolePermissions,
});

const mapDispatchToProps = {
    updateTeamPermissions,
};
export default connect(mapStateToProps, mapDispatchToProps)(RolePermissions);
