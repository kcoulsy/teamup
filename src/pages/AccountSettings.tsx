import React from 'react';
import { PageHeader } from 'antd';
import UserSettings from '../components/UserSettings/UserSettings';

const AccountSettings: React.FunctionComponent = () => {
    return (
        <div>
            <PageHeader
                className="page__page-header"
                title="Account Settings"
            />
            <UserSettings />
        </div>
    );
};

export default AccountSettings;
