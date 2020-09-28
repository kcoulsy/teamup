import React, { useState, useEffect } from 'react';
import { PageHeader, Button, Drawer, Result, notification, Modal } from 'antd';
import TaskView from '../components/TaskView/TaskView';

import { ArrowRightOutlined, EditOutlined } from '@ant-design/icons';
import { useParams, useHistory } from 'react-router-dom';
import { PATH_HOME } from './../constants/pageRoutes';
import { fetchTask, updateTask } from './../actions/task';
import { Task, TaskStatus, taskStatusLabel } from './../types/task';
import TaskForm from './../components/TaskForm/TaskForm';
import { api } from './../services/api';
import { connect } from 'react-redux';
import { RootState } from '../store/configure';
import hasTeamRole from '../helpers/hasTeamRole';
import {
    PERM_EDIT_OTHER_TASK,
    PERM_DELETE_OTHER_TASK,
} from '../constants/permissions';
import { User } from './../types/user';
import PageLayout from '../components/PageLayout/PageLayout';

const { confirm } = Modal;

interface TaskPageProps {
    loggedInUser: User;
    canEditOthersTasks: boolean;
    canDeleteOthersTasks: boolean;
}
const TaskPage = ({
    loggedInUser,
    canEditOthersTasks,
    canDeleteOthersTasks,
}: TaskPageProps) => {
    let { projectid, taskid } = useParams();
    const history = useHistory();
    const [modalOpen, setModalOpen] = useState(false);
    const [task, setTask] = useState<Task | undefined>();
    const createdByLoggedInUser = task?.createdBy === loggedInUser._id;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchTask(taskid)
            .then((task) => {
                setLoading(false);
                setTask(task);
            })
            .catch(() => {
                setLoading(false);
                setTask(undefined);
            });
    }, [taskid]);

    const handleEditTask = (values: Parameters<typeof updateTask>[1]) => {
        updateTask(taskid, values)
            .then((task) => {
                notification.success({
                    message: 'Task updated successfully!',
                    placement: 'bottomRight',
                });
                setTask(task);
            })
            .catch((e) => {
                notification.error({
                    message: 'Something went wrong updating!',
                    placement: 'bottomRight',
                });
                setTask(undefined);
            })
            .finally(() => setModalOpen(false));
    };

    let headerButtons = [];

    if (createdByLoggedInUser || canEditOthersTasks) {
        headerButtons.push(
            <Button key="editTask" onClick={() => setModalOpen(true)}>
                Edit Task <EditOutlined />
            </Button>
        );
    }

    if (task) {
        const statuses = Object.values(TaskStatus);
        const indexOfCurrentStatus = Object.values(taskStatusLabel).indexOf(
            task.status.label
        );

        const canMoveToNextStatus =
            indexOfCurrentStatus + 1 <= statuses.length - 1;

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
    }

    return (
        <>
            <PageLayout
                title={task?.title}
                prevPagePath={`/project/${projectid}`}
                headerButtons={headerButtons}
                loading={loading}>
                <TaskView task={task} />
            </PageLayout>
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
                    teamView={!!task?.project.team}
                />
                {(createdByLoggedInUser || canDeleteOthersTasks) && (
                    <Button
                        danger
                        onClick={() => {
                            confirm({
                                title: 'Delete Task',
                                content:
                                    'Are you sure you want to delete this task?',
                                onOk: async () => {
                                    const res = await api(
                                        `/task/${taskid}`,
                                        'DELETE'
                                    );
                                    if (res) {
                                        setModalOpen(false);
                                        notification.success({
                                            message: 'Task deleted!',
                                            placement: 'bottomRight',
                                        });
                                        history.push(`/project/${projectid}`);
                                    }
                                },
                            });
                        }}>
                        Delete Task
                    </Button>
                )}
            </Drawer>
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    loggedInUser: state.user,
    canEditOthersTasks: hasTeamRole(state, PERM_EDIT_OTHER_TASK),
    canDeleteOthersTasks: hasTeamRole(state, PERM_DELETE_OTHER_TASK),
});

export default connect(mapStateToProps)(TaskPage);
