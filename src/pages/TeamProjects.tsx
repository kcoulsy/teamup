import React, { useState } from 'react';
import { Button, Drawer, Form, Input, notification, Empty } from 'antd';
import ProjectBrowser from '../components/ProjectBrowser/ProjectBrowser';
import { api } from './../services/api';
import { EditOutlined } from '@ant-design/icons';
import { Project } from './../types/project';
import PageLayout from '../components/PageLayout/PageLayout';
import useToggle from './../hooks/useToggle';

interface TeamProjectsProps {
  canCreateProject: boolean;
}

const TeamProjects = ({ canCreateProject }: TeamProjectsProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [completionData, setCompletionData] = useState({});
  const [drawerVisible, toggleDrawer] = useToggle();

  const [loading, setLoading] = useState(false);

  // const fetchProjects = async () => {
  //     try {
  //         setLoading(true);
  //         const res = await api('/project?team=true', 'GET');
  //         if (res) {
  //             setLoading(false);
  //             setProjects(res.projects);
  //             setCompletionData(res.estimatedCompletions);
  //         }
  //     } catch (err) {
  //         setLoading(false);
  //     }
  // };

  // useEffect(() => {
  //     fetchProjects();
  // }, []);

  const headerButtons = [];
  if (canCreateProject) {
    headerButtons.push(
      <Button key='3' onClick={toggleDrawer}>
        Create Project <EditOutlined />
      </Button>
    );
  }
  return (
    <>
      <PageLayout
        title='Team Projects'
        loading={loading}
        headerButtons={headerButtons}>
        {!projects.length ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>No projects found.</span>}>
            <Button type='primary' onClick={toggleDrawer}>
              Create Now
            </Button>
          </Empty>
        ) : (
          <ProjectBrowser projects={projects} completionData={completionData} />
        )}
      </PageLayout>
      <Drawer
        title='Create Project'
        visible={drawerVisible}
        onClose={toggleDrawer}
        width='450'>
        <Form
          name='createProject'
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 19,
          }}
          onFinish={async ({ title, description }) => {
            const res = await api('/project/?team=true', 'POST', {
              title,
              description,
            });
            if (res.project) {
              setProjects([...projects, res.project]);
              toggleDrawer(false);
              notification.success({
                message: 'Project created successfully!',
                placement: 'bottomRight',
              });
            }
          }}>
          <Form.Item
            label='Title'
            name='title'
            rules={[
              {
                required: true,
                message: 'You must have a project title.',
              },
              {
                min: 3,
                message: 'Your title must be at least 3 characters.',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item label='Description' name='description'>
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Create Project
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default TeamProjects;
