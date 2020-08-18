import React from 'react';
import SettingsPanel, {
    SettingsPanelView,
} from './../SettingsPanel/SettingsPanel';
import ProfileSettings from './views/ProfileSettings';
import ChangePassword from './views/ChangePassword';

import { UserOutlined, LockOutlined } from '@ant-design/icons';

const views: SettingsPanelView[] = [
    {
        key: 'profile-settings',
        label: 'Profile Settings',
        icon: <UserOutlined />,
        viewComponent: <ProfileSettings />,
    },
    {
        key: 'change-password',
        label: 'Change Password',
        icon: <LockOutlined />,
        viewComponent: <ChangePassword />,
    },
];

const UserSettings: React.FunctionComponent = () => {
    return <SettingsPanel views={views} />;
};
export default UserSettings;
