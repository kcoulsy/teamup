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
import AddTask from '../components/AddTask/AddTask';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { api } from './../services/api';
import { Project } from './../types/project';
import { useParams, useHistory } from 'react-router-dom';
import { PATH_MY_PROJECTS } from './../constants/pageRoutes';

const { confirm } = Modal;

const ProjectPage: React.FunctionComponent = () => {
    let { projectid } = useParams();
    const history = useHistory();
    const [project, setProject] = useState<Project>();
    const [editProjectDrawerOpen, setEditProjectDrawerOpen] = useState(false);
    const [addTaskDrawerOpen, setAddTaskDrawerOpen] = useState(false);

    useEffect(() => {
        async function fetchProject() {
            const res = await api(`/project/${projectid}`, 'GET');

            if (res) {
                setProject(res.projects[0]);
            }
        }
        fetchProject();
    }, []);

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
                            Create Project
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
                onClose={() => setAddTaskDrawerOpen(!addTaskDrawerOpen)}
                width="450">
                <AddTask />
            </Drawer>
            <ProjectView />
        </div>
    );
};

export default ProjectPage;
