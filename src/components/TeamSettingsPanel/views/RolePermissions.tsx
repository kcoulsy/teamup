import React, { useState } from 'react';
import { Transfer, Typography, Select } from 'antd';
import PERMISSIONS, { permissionLabels } from '../../../constants/permissions';
import { connect } from 'react-redux';
import { RootState } from '../../../store/configure';

const { Title } = Typography;
const { Option } = Select;

interface RolePermissionsProps {
    roles: any[]; // TODO change within state
    rolePermissions: any[];
}
const RolePermissions: React.FunctionComponent<RolePermissionsProps> = ({
    roles,
    rolePermissions,
}) => {
    const [targetKeys, setTargetKeys] = useState([
        ...Object.values(PERMISSIONS),
    ]);
    const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);

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
                onChange={(value) => {
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
                onChange={(targetKeys) => setTargetKeys(targetKeys)}
                render={(item) => `${item.label}`}
            />
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    roles: state.team.roles,
    rolePermissions: state.team.rolePermissions,
});

export default connect(mapStateToProps)(RolePermissions);
