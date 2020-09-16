import React, { useState, useEffect } from 'react';
import { PageHeader, Button, Drawer, Result } from 'antd';
import TaskView from '../components/TaskView/TaskView';

import { EditOutlined } from '@ant-design/icons';
// import AddTask from '../components/AddTask/AddTask';
import { useParams, useHistory } from 'react-router-dom';
import { api } from './../services/api';
import { PATH_HOME } from './../constants/pageRoutes';

const TaskPage: React.FunctionComponent = () => {
    let { taskid } = useParams();
    const history = useHistory();
    const [modalOpen, setModalOpen] = useState(false);
    const handleAddTask = () => {
        setModalOpen(!modalOpen);
    };
    const [task, setTask] = useState<any>();
    useEffect(() => {
        async function fetchTask() {
            const res = await api(`/task/${taskid}`, 'GET');
            setTask(res.task);
        }
        fetchTask();
    }, []);
    if (!task) {
        return (
            <Result
                status="warning"
                title="This task does not exist!."
                extra={
                    <Button
                        type="primary"
                        key="console"
                        onClick={() => {
                            history.push(PATH_HOME);
                        }}>
                        Back to dashboard
                    </Button>
                }
            />
        );
    }
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
