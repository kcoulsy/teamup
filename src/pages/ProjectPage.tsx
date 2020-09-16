import React, { useState, useEffect } from 'react';
import {
    PageHeader,
    Button,
    Drawer,
    Form,
    Input,
    notification,
    Modal,
} from 'antd';
import ProjectView from '../components/ProjectView/ProjectView';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { api } from './../services/api';
import { Project } from './../types/project';
import { useParams, useHistory } from 'react-router-dom';
import { PATH_MY_PROJECTS } from './../constants/pageRoutes';
import { TaskRow } from '../types/task';
import mapProjectTasksToTaskRow from '../helpers/mapProjectTasksToTaskRow';
import TaskForm from './../components/TaskForm/TaskForm';

const { confirm } = Modal;

const ProjectPage: React.FunctionComponent = () => {
    let { projectid } = useParams();
    const history = useHistory();
    const [project, setProject] = useState<Project>();
    const [editProjectDrawerOpen, setEditProjectDrawerOpen] = useState(false);
    const [addTaskDrawerOpen, setAddTaskDrawerOpen] = useState(false);

    async function fetchProject() {
        const res = await api(`/project/${projectid}`, 'GET');

        if (res) {
            setProject(res.project);
        }
    }
    useEffect(() => {
        fetchProject();
    }, []);

    let tasks: TaskRow[] = mapProjectTasksToTaskRow(project?.tasks, projectid);

    async function addTask({
        title,
        description,
        estimatedHours,
        status,
    }: {
        title: string;
        description: string;
        estimatedHours: number;
        status: string; //TODO type this
    }) {
        const res = await api('/task', 'POST', {
            project: project?._id,
            title,
            description,
            estimatedHours,
            status,
        });

        if (res) {
            //TODO no need to refetch.. just update state
            fetchProject();
            return true;
        }

        return false;
    }

    const handleDelete = () => {
        confirm({
            title: 'Remove Project',
            content:
                'This project and all tasks will be lost, are you sure you want to delete it?',
            onOk: async () => {
                const res = await api('/project/', 'DELETE', {
                    projectId: projectid,
                });

                if (res) {
                    history.push(PATH_MY_PROJECTS);
                    notification.success({
                        message: 'Project has been successfully deleted!',
                    });
                }
            },
        });
    };

    return (
        <div>
            <PageHeader
                className="site-page-header"
                title={project?.title}
                subTitle={project?.description}
                style={{ margin: 0, padding: 0, paddingBottom: '10px' }}
                onBack={() => history.push(PATH_MY_PROJECTS)}
                extra={[
                    <Button
                        key="1"
                        type="default"
                        onClick={() =>
                            setEditProjectDrawerOpen(!editProjectDrawerOpen)
                        }>
                        Edit Project
                        <EditOutlined />
                    </Button>,
                    <Button
                        key="2"
                        type="primary"
                        onClick={() =>
                            setAddTaskDrawerOpen(!addTaskDrawerOpen)
                        }>
                        Add Task <PlusOutlined />
                    </Button>,
                ]}
            />
            <Drawer
                title="Edit Project"
                visible={editProjectDrawerOpen}
                onClose={() => setEditProjectDrawerOpen(!editProjectDrawerOpen)}
                width="450">
                <Form
                    name="createProject"
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
                    onFinish={async ({ title, description }) => {
                        const res = await api('/project', 'PUT', {
                            projectId: project?._id,
                            title,
                            description,
                        });
                        if (res.project) {
                            setProject(res.project);
                            setEditProjectDrawerOpen(false);
                            notification.success({
                                message: 'Project edited successfully!',
                            });
                        }
                    }}>
                    <Form.Item label="Title" name="title">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Edit Project
                        </Button>
                        <Button
                            danger
                            style={{ marginLeft: '5px' }}
                            onClick={handleDelete}>
                            Remove Project
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
            <Drawer
                title="Add Task To Project"
                visible={addTaskDrawerOpen}
                onClose={() => {
                    fetchProject();
                    setAddTaskDrawerOpen(!addTaskDrawerOpen);
                }}
                width="450">
                <TaskForm
                    teamView={false}
                    onFormFinish={async (task) => {
                        const taskAdded = addTask({ ...task });
                        if (taskAdded) {
                            setAddTaskDrawerOpen(false);
                        }
                    }}
                    type="Add"
                />
            </Drawer>
            <ProjectView tasks={tasks} />
        </div>
    );
};

export default ProjectPage;
