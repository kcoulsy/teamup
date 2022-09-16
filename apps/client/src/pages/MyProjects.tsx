import React from 'react';
import { Button, Drawer, Form, Input, notification, Empty } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import ProjectBrowser from '../components/ProjectBrowser/ProjectBrowser';
import PageLayout from '../components/PageLayout/PageLayout';
import useToggle from '../hooks/useToggle';
import useProjects from '../hooks/useProjects';

function MyProjects() {
  const { data, isLoading, createMutation } = useProjects();
  const [drawerOpen, toggleDrawer] = useToggle();

  const handleCreateProject = async ({ title, description }: Store) => {
    await createMutation.mutateAsync({ title, description });

    toggleDrawer(false);
    notification.success({
      message: 'Project created successfully!',
      placement: 'bottomRight',
    });
  };

  return (
    <>
      <PageLayout
        title='My Projects'
        loading={isLoading}
        headerButtons={[
          <Button key='3' onClick={toggleDrawer}>
            Create Project
            <EditOutlined />
          </Button>,
        ]}
      >
        {!data?.projects.length ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>No projects found.</span>}
          >
            <Button type='primary' onClick={toggleDrawer}>
              Create Now
            </Button>
          </Empty>
        ) : (
          <ProjectBrowser />
        )}
      </PageLayout>

      <Drawer
        title='Create Project'
        visible={drawerOpen}
        onClose={toggleDrawer}
        width='450'
      >
        <Form
          name='createProject'
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 19,
          }}
          onFinish={handleCreateProject}
        >
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
            ]}
          >
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
}

export default MyProjects;
