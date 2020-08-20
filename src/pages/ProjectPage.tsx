import React, { useState } from 'react';
import { PageHeader, Button, Drawer } from 'antd';
import ProjectView from '../components/ProjectView/ProjectView';
import AddTask from '../components/AddTask/AddTask';
import { PlusOutlined } from '@ant-design/icons';

const ProjectPage: React.FunctionComponent = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleAddTask = () => {
        setDrawerOpen(!drawerOpen);
    }
    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="Project View"
                style={{ margin: 0, padding: 0, paddingBottom: '10px' }}
                extra={[<Button key="1" type="primary" onClick={handleAddTask}>Add Task <PlusOutlined/></Button>]}
            />
            <Drawer
                title="Add Task To Project"
                visible={drawerOpen}
                onClose={handleAddTask}
                width="450">
                <AddTask />
            </Drawer>
            <ProjectView />
        </div>
    );
};

export default ProjectPage;
