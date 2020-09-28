import React, { useState, useEffect } from 'react';
import {
    PageHeader,
    Button,
    Drawer,
    Form,
    Input,
    notification,
    Modal,
    Spin,
    Space,
} from 'antd';
import ProjectView from '../components/ProjectView/ProjectView';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { api } from './../services/api';
import { Project } from './../types/project';
import { useParams, useHistory } from 'react-router-dom';
import {
    PATH_MY_PROJECTS,
    PATH_TEAM_PROJECTS,
} from './../constants/pageRoutes';
import { TaskRow } from '../types/task';
import mapProjectTasksToTaskRow from '../helpers/mapProjectTasksToTaskRow';
import TaskForm from './../components/TaskForm/TaskForm';
import { RootState } from '../store/configure';
import hasTeamRole from '../helpers/hasTeamRole';
import { connect } from 'react-redux';
import {
    PERM_ADD_TASK,
    PERM_EDIT_TEAM_PROJECT,
    PERM_REMOVE_TEAM_PROJECT,
} from './../constants/permissions';
import { Store } from 'antd/lib/form/interface';
import PageLayout from './../components/PageLayout/PageLayout';

const { confirm } = Modal;

interface ProjectPageProps {
    canAddTeamTask: boolean;
    canEditTeamProject: boolean;
    canRemoveTeamProject: boolean;
}

const ProjectPage = ({
    canAddTeamTask,
    canEditTeamProject,
    canRemoveTeamProject,
}: ProjectPageProps) => {
    let { projectid } = useParams();
    const history = useHistory();
    const [project, setProject] = useState<Project>();
    const [editProjectDrawerOpen, setEditProjectDrawerOpen] = useState(false);
    const [addTaskDrawerOpen, setAddTaskDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchProject = async () => {
        try {
            setLoading(true);
            const res = await api(`/project/${projectid}`, 'GET');
            if (res) {
                setLoading(false);
                setProject(res.project);
            }
        } catch (err) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProject();
    }, []);

    let tasks: TaskRow[] = mapProjectTasksToTaskRow(project?.tasks, projectid);

    const addTask = async ({
        title,
        description,
        estimatedHours,
        status,
    }: Store) => {
        const res = await api('/task', 'POST', {
            project: project?._id,
            title,
            description,
            estimatedHours,
            status,
        });

        if (res) {
            fetchProject();
            setAddTaskDrawerOpen(false);
        }
    };

    const handleEditProjectFormFinish = async ({
        title,
        description,
    }: Store) => {
        const res = await api('/project', 'PUT', {
            projectId: project?._id,
            title,
            description,
        });
        if (res.success) {
            setProject(res.project);
            setEditProjectDrawerOpen(false);
            notification.success({
                message: 'Project edited successfully!',
                placement: 'bottomRight',
            });
        } else {
            notification.error({
                message: 'You do not have permission to update this project.',
                placement: 'bottomRight',
            });
        }
    };

    const handleDelete = () => {
        confirm({
            title: 'Remove Project',
            content:
                'This project and all tasks will be lost, are you sure you want to delete it?',
            onOk: async () => {
                const res = await api('/project', 'DELETE', {
                    projectId: projectid,
                });

                if (res.success) {
                    history.push(
                        project?.team ? PATH_TEAM_PROJECTS : PATH_MY_PROJECTS
                    );
                    notification.success({
                        message: 'Project has been successfully deleted!',
                        placement: 'bottomRight',
                    });
                } else {
                    notification.error({
                        message:
                            'You do not have permission to remove this project.',
                        placement: 'bottomRight',
                    });
                }
            },
        });
    };

    const handleAddProjectDrawerClose = () => {
        fetchProject();
        setAddTaskDrawerOpen(!addTaskDrawerOpen);
    };

    const headerButtons = [];
    if (!project?.team || canEditTeamProject) {
        headerButtons.push(
            <Button
                key="1"
                type="default"
                onClick={() =>
                    setEditProjectDrawerOpen(!editProjectDrawerOpen)
                }>
                Edit Project
                <EditOutlined />
            </Button>
        );
    }

    if (!project?.team || canAddTeamTask) {
        headerButtons.push(
            <Button
                key="2"
                type="primary"
                onClick={() => setAddTaskDrawerOpen(!addTaskDrawerOpen)}>
                Add Task <PlusOutlined />
            </Button>
        );
    }

    return (
        <>
            <PageLayout
                title={project?.title}
                subTitle={project?.description}
                loading={loading}
                prevPagePath={PATH_MY_PROJECTS}>
                <ProjectView tasks={tasks} />
            </PageLayout>
            <Drawer
                title="Edit Project"
                visible={editProjectDrawerOpen}
                onClose={() => setEditProjectDrawerOpen(!editProjectDrawerOpen)}
                width="450">
                <Form
                    name="editProject"
                    labelCol={{
                        span: 5,
                    }}
                    wrapperCol={{
                        span: 19,
                    }}
                    initialValues={{
                        title: project?.title,
                        description: project?.description,
                    }}
                    onFinish={handleEditProjectFormFinish}>
                    <Form.Item label="Title" name="title">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Edit Project
                            </Button>
                            {canRemoveTeamProject && (
                                <Button danger onClick={handleDelete}>
                                    Remove Project
                                </Button>
                            )}
                        </Space>
                    </Form.Item>
                </Form>
            </Drawer>
            <Drawer
                title="Add Task To Project"
                visible={addTaskDrawerOpen}
                onClose={handleAddProjectDrawerClose}
                width="450">
                <TaskForm teamView={false} onFormFinish={addTask} type="Add" />
            </Drawer>
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    canAddTeamTask: hasTeamRole(state, PERM_ADD_TASK),
    canEditTeamProject: hasTeamRole(state, PERM_EDIT_TEAM_PROJECT),
    canRemoveTeamProject: hasTeamRole(state, PERM_REMOVE_TEAM_PROJECT),
});

export default connect(mapStateToProps)(ProjectPage);
