import React from 'react';
import { PageHeader } from 'antd';
import TeamSettingsPanel from '../components/TeamSettingsPanel/TeamSettingsPanel';

const TeamSettings: React.FunctionComponent = () => {
    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="Team Settings"
                style={{ margin: 0, padding: 0, paddingBottom: '10px' }}
            />
            <TeamSettingsPanel />
        </div>
    );
};

export default TeamSettings;
