import React, { useEffect, useState } from 'react';
import { PageHeader, Button, Drawer, Form, Input, notification } from 'antd';
import ProjectBrowser from '../components/ProjectBrowser/ProjectBrowser';
import { api } from './../services/api';
import { EditOutlined } from '@ant-design/icons';
import { Project } from './../types/project';
import { RootState } from '../store/configure';
import { PERM_CREATE_TEAM_PROJECT } from './../constants/permissions';
import hasTeamRole from '../helpers/hasTeamRole';
import { connect } from 'react-redux';

interface TeamProjectsProps {
    canCreateProject: boolean;
}

const TeamProjects = ({ canCreateProject }: TeamProjectsProps) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [completionData, setCompletionData] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    useEffect(() => {
        async function fetchProjects() {
            const res = await api('/project/team', 'GET');
            setProjects(res.projects);
            setCompletionData(res.estimatedCompletions);
        }
        fetchProjects();
    }, []);
    const headerButtons = [];
    if (canCreateProject) {
        headerButtons.push(
            <Button key="3" onClick={() => setModalOpen(!modalOpen)}>
                Create Project <EditOutlined />
            </Button>
        );
    }
    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="Team Projects"
                style={{ margin: 0, padding: 0, paddingBottom: '10px' }}
                extra={headerButtons}
            />
            <Drawer
                title="Create Project"
                visible={modalOpen}
                onClose={() => setModalOpen(!modalOpen)}
                width="450">
                <Form
                    name="createProject"
                    labelCol={{
                        span: 5,
                    }}
                    wrapperCol={{
                        span: 19,
                    }}
                    onFinish={async ({ title, description }) => {
                        const res = await api('/project/team', 'POST', {
                            title,
                            description,
                        });
                        if (res.project) {
                            setProjects([...projects, res.project]);
                            setModalOpen(false);
                            notification.success({
                                message: 'Project created successfully!',
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
                    </Form.Item>
                </Form>
            </Drawer>
            <ProjectBrowser
                projects={projects}
                completionData={completionData}
            />
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    canCreateProject: hasTeamRole(state, PERM_CREATE_TEAM_PROJECT),
});

export default connect(mapStateToProps)(TeamProjects);
