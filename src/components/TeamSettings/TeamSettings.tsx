import React from 'react';
import SettingsPanel, {
    SettingsPanelView,
} from './../SettingsPanel/SettingsPanel';
import GeneralSettings from './views/GeneralSettings';
import TeamMembers from './views/TeamMembers';
import TeamRoles from './views/TeamRoles';
import RolePermissions from './views/RolePermissions';
import { TeamOutlined } from '@ant-design/icons';

const views: SettingsPanelView[] = [
    {
        key: 'general-settings',
        label: 'General Settings',
        icon: <TeamOutlined />,
        viewComponent: <TeamMembers />,
    },
    {
        key: 'team-members',
        label: 'Team Members',
        icon: <TeamOutlined />,
        viewComponent: <TeamMembers />,
    },
    {
        key: 'team-roles',
        label: 'Team Roles',
        icon: <TeamOutlined />,
        viewComponent: <TeamRoles />,
    },
    {
        key: 'role-permissions',
        label: 'Role Permissions',
        icon: <TeamOutlined />,
        viewComponent: <RolePermissions />,
    },
];

const UserSettings: React.FunctionComponent = () => {
    return <SettingsPanel views={views} />;
};

export default UserSettings;
