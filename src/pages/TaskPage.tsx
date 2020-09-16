import React, { useState } from 'react';
import { PageHeader, Button, Drawer } from 'antd';
import TaskView from '../components/TaskView/TaskView';

import { EditOutlined } from '@ant-design/icons';
// import AddTask from '../components/AddTask/AddTask';

const TaskPage: React.FunctionComponent = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const handleAddTask = () => {
        setModalOpen(!modalOpen);
    };
    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="Task View"
                style={{ margin: 0, padding: 0, paddingBottom: '10px' }}
                extra={[
                    <Button key="3" onClick={handleAddTask}>
                        Edit Task <EditOutlined />
                    </Button>,
                ]}
            />
            <Drawer
                title="Edit Project Task"
                visible={modalOpen}
                onClose={handleAddTask}
                width="450">
                TODO rename this component probs
                {/* <AddTask teamView={false} /> */}
            </Drawer>
            <TaskView />
        </div>
    );
};

export default TaskPage;
