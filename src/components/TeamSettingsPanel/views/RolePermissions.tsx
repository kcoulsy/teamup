import React, { useState } from 'react';
import { Transfer, Typography, Select } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const roles = [
    'Project Manager',
    'Quality Assurance',
    'Business Analyst',
    'Developer',
];

const RolePermissions: React.FunctionComponent = (props) => {
    const [targetKeys, setTargetKeys] = useState(['role.team.settings.manage']);
    const data = [
        {
            key: 'role.team.settings.manage',
            label: 'Manage Team Settings',
        },
        {
            key: 'role.team.settings.view',
            label: 'View Team Settings',
        },
        {
            key: 'role.team.roles.manage',
            label: 'Manage Team Roles',
        },
        {
            key: 'role.team.permissions.manage',
            label: 'Manage Team Role Permissions',
        },
        {
            key: 'role.team.member.add',
            label: 'Add Team Members',
        },
        {
            key: 'role.team.member.edit',
            label: 'Edit Team Members Role',
        },
        {
            key: 'role.team.member.remove',
            label: 'Remove Team Members',
        },
        {
            key: 'role.team.project.create',
            label: 'Create Team Project',
        },
        {
            key: 'role.team.project.edit',
            label: 'Edit Team Project',
        },
        {
            key: 'role.team.project.remove',
            label: 'Remove Team Project',
        },
    ];

    return (
        <div>
            <Title level={4} style={{ marginBottom: '20px' }}>
                Role Permissions
            </Title>
            <Select defaultValue={roles[0]} style={{ marginBottom: '20px' }}>
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

export default RolePermissions;
