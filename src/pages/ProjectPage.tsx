import React from 'react';
import { PageHeader, Button } from 'antd';
import ProjectView from '../components/ProjectView/ProjectView';

const ProjectPage: React.FunctionComponent = () => {
    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="Project View"
                style={{margin: 0, padding: 0, paddingBottom: '10px'}}
                extra={[
                    <Button key="3">Operation</Button>
                ]}
            />
            <ProjectView />
        </div>
    );
};

export default ProjectPage;
