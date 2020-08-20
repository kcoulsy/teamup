import React, { useState } from 'react';
import { PageHeader, Button, Modal } from 'antd';
import TaskView from '../components/TaskView/TaskView';

import { EditOutlined } from '@ant-design/icons';
import AddTask from '../components/AddTask/AddTask';

const Home: React.FunctionComponent = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const handleAddTask = () => {
        setModalOpen(!modalOpen);
    }
    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="Task View"
                style={{margin: 0, padding: 0, paddingBottom: '10px'}}
                extra={[
                    <Button key="3" onClick={handleAddTask}>Edit Task <EditOutlined/></Button>
                ]}
            />
            <Modal
                title="Add Task To Project"
                visible={modalOpen}
                onOk={handleAddTask}
                onCancel={handleAddTask}
                >
                <AddTask />
                </Modal>
            <TaskView />
        </div>
    );
};

export default Home;
