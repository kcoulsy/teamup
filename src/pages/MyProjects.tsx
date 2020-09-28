import React, { useEffect, useState } from 'react';
import {
    PageHeader,
    Button,
    Drawer,
    Form,
    Input,
    notification,
    Spin,
} from 'antd';
import ProjectBrowser from '../components/ProjectBrowser/ProjectBrowser';
import { api } from './../services/api';
import { EditOutlined } from '@ant-design/icons';
import { Project } from './../types/project';
import { Store } from 'antd/lib/form/interface';
import PageLayout from './../components/PageLayout/PageLayout';

const MyProjects: React.FunctionComponent = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [completionData, setCompletionData] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const res = await api('/project', 'GET');
            if (res) {
                setLoading(false);
                setProjects(res.projects);
                setCompletionData(res.estimatedCompletions);
            }
        } catch (err) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleCreateProject = async ({ title, description }: Store) => {
        const res = await api('/project', 'POST', {
            title,
            description,
        });
        if (res.project) {
            setProjects([...projects, res.project]);
            setModalOpen(false);
            notification.success({
                message: 'Project created successfully!',
                placement: 'bottomRight',
            });
        }
    };

    const toggleModal = () => setModalOpen(!modalOpen);

    return (
        <>
            <PageLayout
                title="My Projects"
                loading={loading}
                headerButtons={[
                    <Button key="3" onClick={toggleModal}>
                        Create Project <EditOutlined />
                    </Button>,
                ]}>
                <ProjectBrowser
                    projects={projects}
                    completionData={completionData}
                />
            </PageLayout>

            <Drawer
                title="Create Project"
                visible={modalOpen}
                onClose={toggleModal}
                width="450">
                <Form
                    name="createProject"
                    labelCol={{
                        span: 5,
                    }}
                    wrapperCol={{
                        span: 19,
                    }}
                    onFinish={handleCreateProject}>
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
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};

export default MyProjects;
