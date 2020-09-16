import React, { useState, useEffect } from 'react';
import { PageHeader, Button, Drawer, Result, notification } from 'antd';
import TaskView from '../components/TaskView/TaskView';

import { ArrowRightOutlined, EditOutlined } from '@ant-design/icons';
// import AddTask from '../components/AddTask/AddTask';
import { useParams, useHistory } from 'react-router-dom';
import { PATH_HOME } from './../constants/pageRoutes';
import { fetchTask, updateTask } from './../actions/task';
import { Task, TaskStatus, taskStatusLabel } from './../types/task';
import TaskForm from './../components/TaskForm/TaskForm';

const TaskPage: React.FunctionComponent = () => {
    let { projectid, taskid } = useParams();
    const history = useHistory();
    const [modalOpen, setModalOpen] = useState(false);
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

    const handleEditTask = (values: Parameters<typeof updateTask>[1]) => {
        updateTask(taskid, values)
            .then((task) => {
                notification.success({
                    message: 'Task updated successfully!',
                });
                setTask(task);
            })
            .catch((e) => {
                notification.error({
                    message: 'Something went wrong updating!',
                });
                setTask(undefined);
            })
            .finally(() => setModalOpen(false));
    };

    let headerButtons = [
        <Button key="editTask" onClick={() => setModalOpen(true)}>
            Edit Task <EditOutlined />
        </Button>,
    ];

    const statuses = Object.values(TaskStatus);
    const indexOfCurrentStatus = Object.values(taskStatusLabel).indexOf(
        task.status.label
    );
    // TODO add both labels and normal status to task object
    const canMoveToNextStatus = indexOfCurrentStatus + 1 <= statuses.length - 1;

    if (canMoveToNextStatus) {
        const nextStatus = statuses[indexOfCurrentStatus + 1];
        const nextStatusLabel = `Move to ${taskStatusLabel[nextStatus]}`;
        headerButtons = [
            ...headerButtons,
            <Button
                type="primary"
                key="nextStatus"
                onClick={() => handleEditTask({ status: nextStatus })}>
                {nextStatusLabel}
                <ArrowRightOutlined />
            </Button>,
        ];
    }

    return (
        <div>
            <PageHeader
                className="site-page-header"
                title={task?.title}
                style={{ margin: 0, padding: 0, paddingBottom: '10px' }}
                onBack={() => history.push(`/project/${projectid}`)}
                extra={headerButtons}
            />
            <Drawer
                title="Edit Project Task"
                visible={modalOpen}
                onClose={() => setModalOpen(false)}
                width="450">
                <TaskForm
                    onFormFinish={async (values) => {
                        setModalOpen(false);
                        handleEditTask(values);
                    }}
                    type="Edit"
                    initialValues={task}
                    teamView={false}
                />
            </Drawer>
            <TaskView task={task} />
        </div>
    );
};

export default TaskPage;
