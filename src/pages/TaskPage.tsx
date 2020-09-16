import React, { useState, useEffect } from 'react';
import { PageHeader, Button, Drawer, Result } from 'antd';
import TaskView from '../components/TaskView/TaskView';

import { EditOutlined } from '@ant-design/icons';
// import AddTask from '../components/AddTask/AddTask';
import { useParams, useHistory } from 'react-router-dom';
import { PATH_HOME } from './../constants/pageRoutes';
import { fetchTask } from './../actions/task';
import { Task } from './../types/task';

const TaskPage: React.FunctionComponent = () => {
    let { taskid } = useParams();
    const history = useHistory();
    const [modalOpen, setModalOpen] = useState(false);
    const handleAddTask = () => {
        setModalOpen(!modalOpen);
    };
    const [task, setTask] = useState<Task | undefined>();
    useEffect(() => {
        fetchTask(taskid)
            .then((task) => {
                setTask(task);
            })
            .catch(() => {
                setTask(undefined);
            });
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
                title={task?.title}
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
            <TaskView task={task} />
        </div>
    );
};

export default TaskPage;
