import React, { useState } from 'react';
import { PageHeader, Button, Modal } from 'antd';
import ProjectView from '../components/ProjectView/ProjectView';

import { PlusOutlined } from '@ant-design/icons';
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
                title="Project View"
                style={{margin: 0, padding: 0, paddingBottom: '10px'}}
                extra={[
                    <Button key="3" type="primary" onClick={handleAddTask}>Add Task <PlusOutlined/></Button>
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
            <ProjectView />
        </div>
    );
};

export default Home;
