import React from 'react';
import { PageHeader } from 'antd';
import UserSettings from '../components/UserSettings/UserSettings';

const AccountSettings: React.FunctionComponent = () => {
    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="Account Settings"
                style={{margin: 0, padding: 0, paddingBottom: '10px'}}
            />
            <UserSettings />
        </div>
    );
};

export default AccountSettings;
