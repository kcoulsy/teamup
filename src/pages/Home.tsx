import React from 'react';
import { PageHeader } from 'antd';
import TeamSettings from '../components/TeamSettings/TeamSettings';

const Home: React.FunctionComponent = () => {
    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="Team Settings"
                style={{margin: 0, padding: 0, paddingBottom: '10px'}}
            />
            <TeamSettings />
        </div>
    );
};

export default Home;
