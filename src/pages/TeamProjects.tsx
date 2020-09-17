import React from 'react';
import { PageHeader } from 'antd';
// import ProjectBrowser from '../components/ProjectBrowser/ProjectBrowser';

const TeamProjects: React.FunctionComponent = () => {
    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="Team Projects"
                style={{ margin: 0, padding: 0, paddingBottom: '10px' }}
            />
            {/* <ProjectBrowser projects={[]} /> */}
        </div>
    );
};

export default TeamProjects;
