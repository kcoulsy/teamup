import React from 'react';
import { PageHeader, Button } from 'antd';
import TaskView from '../components/TaskView/TaskView';

const TaskPage: React.FunctionComponent = () => {
    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="Task View"
                style={{margin: 0, padding: 0, paddingBottom: '10px'}}
                extra={[
                    <Button key="3">Edit</Button>
                ]}
            />
            <TaskView />
        </div>
    );
};

export default TaskPage;
