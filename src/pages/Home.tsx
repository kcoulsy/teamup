import React from 'react';
import { PageHeader } from 'antd';
import ProjectBrowser from '../components/ProjectBrowser/ProjectBrowser';

const Home: React.FunctionComponent = () => {
    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="Team Projects"
                style={{margin: 0, padding: 0, paddingBottom: '10px'}}
            />
            <ProjectBrowser />
        </div>
    );
};

export default Home;
