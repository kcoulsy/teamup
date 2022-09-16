import React from 'react';
import { TeamOutlined } from '@ant-design/icons';
import SettingsPanel, { SettingsPanelView } from '../SettingsPanel/SettingsPanel';
import GeneralSettings from './views/GeneralSettings';
import TeamMembers from './views/TeamMembers';
import TeamRoles from './views/TeamRoles';
import RolePermissions from './views/RolePermissions';

const views: SettingsPanelView[] = [
  {
    key: 'general-settings',
    label: 'General Settings',
    icon: <TeamOutlined />,
    viewComponent: <GeneralSettings />,
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

function UserSettings() {
  return <SettingsPanel views={views} />;
}

export default UserSettings;
