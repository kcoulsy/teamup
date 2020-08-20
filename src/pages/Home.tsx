import React from 'react';
import { PageHeader } from 'antd';
import ProjectView from '../components/ProjectView/ProjectView';

const Home: React.FunctionComponent = () => {
    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="Project View"
                style={{margin: 0, padding: 0, paddingBottom: '10px'}}
            />
            <ProjectView />
        </div>
    );
};

export default Home;
