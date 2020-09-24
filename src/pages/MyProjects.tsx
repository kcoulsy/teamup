import React, { useEffect, useState } from 'react';
import {
    PageHeader,
    Button,
    Drawer,
    Form,
    Input,
    notification,
    Spin,
    Space,
} from 'antd';
import ProjectBrowser from '../components/ProjectBrowser/ProjectBrowser';
import { api } from './../services/api';
import { EditOutlined } from '@ant-design/icons';
import { Project } from './../types/project';
import useApi from './../hooks/useApi';
import { Store } from 'antd/lib/form/interface';

const MyProjects: React.FunctionComponent = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [completionData, setCompletionData] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const { response, loading, error } = useApi('/project', 'GET');

    useEffect(() => {
        if (response?.projects) {
            setProjects(response.projects);
            setCompletionData(response.estimatedCompletions);
        }
    }, [response, loading, error, completionData, modalOpen]);

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
        <div>
            <PageHeader
                className="site-page-header"
                title="My Projects"
                style={{ margin: 0, padding: 0, paddingBottom: '10px' }}
                extra={[
                    <Button key="3" onClick={toggleModal}>
                        Create Project <EditOutlined />
                    </Button>,
                ]}
            />
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
            {loading && (
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                    <Spin />
                </div>
            )}
            <ProjectBrowser
                projects={projects}
                completionData={completionData}
            />
        </div>
    );
};

export default MyProjects;
