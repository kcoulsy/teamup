import React, { useState } from 'react';
import { Button, Drawer, Form, Input, notification, Modal, Space } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useParams, useHistory } from 'react-router-dom';
import ProjectView from '../components/ProjectView/ProjectView';
import { api } from '../services/api';
import { Project } from '../types/project';
import { PATH_MY_PROJECTS, PATH_TEAM_PROJECTS } from '../constants/pageRoutes';
import TaskForm from '../components/TaskForm/TaskForm';
import PageLayout from '../components/PageLayout/PageLayout';
import useToggle from '../hooks/useToggle';
import useTeams from '../hooks/useTeams';
import useUser from '../hooks/useUser';
import {
  PERM_ADD_TASK,
  PERM_EDIT_TEAM_PROJECT,
  PERM_REMOVE_TEAM_PROJECT,
} from '../constants/permissions';

const { confirm } = Modal;

function ProjectPage() {
  const { data } = useUser();
  const { hasPermission } = useTeams();
  const canEditTeamProject = hasPermission(PERM_EDIT_TEAM_PROJECT);
  const canAddTeamTask = hasPermission(PERM_ADD_TASK);
  const canRemoveTeamProject = hasPermission(PERM_REMOVE_TEAM_PROJECT);
  const { projectid } = useParams<{ projectid: string }>();
  const history = useHistory();
  const [project] = useState<Project>();
  const [editProjectDrawerOpen, toggleEditProjectDrawer] = useToggle();
  const [addTaskDrawerOpen, toggleAddTaskDrawer] = useToggle();
  const [loading] = useState(false);
  const isOwnProject = project?.user === data?.user.id;

  // const fetchProject = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await api(`/project/${projectid}`, 'GET');
  //     if (res) {
  //       setLoading(false);
  //       setProject(res.project);
  //     }
  //   } catch (err) {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchProject();
  // }, []);

  // const tasks: TaskRow[] = mapProjectTasksToTaskRow(project?.tasks, projectid);

  const addTask = async () => {
    // const res = await api('/task', 'POST', {
    //   project: project?._id,
    //   title,
    //   description,
    //   estimatedHours,
    //   status,
    // });
    // if (res) {
    //   // fetchProject();
    //   toggleAddTaskDrawer(false);
    // }
  };

  const handleEditProjectFormFinish = async () => {
    // const res = await api('/project', 'PUT', {
    //   projectId: project?._id,
    //   title,
    //   description,
    // });
    // if (res.success) {
    //   setProject(res.project);
    //   toggleEditProjectDrawer(false);
    //   notification.success({
    //     message: 'Project edited successfully!',
    //     placement: 'bottomRight',
    //   });
    // } else {
    //   notification.error({
    //     message: 'You do not have permission to update this project.',
    //     placement: 'bottomRight',
    //   });
    // }
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
          history.push(project?.team ? PATH_TEAM_PROJECTS : PATH_MY_PROJECTS);
          notification.success({
            message: 'Project has been successfully deleted!',
            placement: 'bottomRight',
          });
        } else {
          notification.error({
            message: 'You do not have permission to remove this project.',
            placement: 'bottomRight',
          });
        }
      },
    });
  };

  const handleAddProjectDrawerClose = () => {
    // fetchProject();
    toggleAddTaskDrawer();
  };

  const headerButtons = [];

  if (isOwnProject || !project?.team || canEditTeamProject) {
    headerButtons.push(
      <Button key='1' type='default' onClick={toggleEditProjectDrawer}>
        Edit Project
        <EditOutlined />
      </Button>,
    );
  }

  if (isOwnProject || !project?.team || canAddTeamTask) {
    headerButtons.push(
      <Button key='2' type='primary' onClick={toggleAddTaskDrawer}>
        Add Task
        <PlusOutlined />
      </Button>,
    );
  }

  return (
    <>
      <PageLayout
        title={project?.title}
        subTitle={project?.description}
        loading={loading}
        prevPagePath={PATH_MY_PROJECTS}
        headerButtons={headerButtons}
      >
        <ProjectView />
      </PageLayout>
      <Drawer
        title='Edit Project'
        visible={editProjectDrawerOpen}
        onClose={toggleEditProjectDrawer}
        width='450'
      >
        <Form
          name='editProject'
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
          onFinish={handleEditProjectFormFinish}
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
            <Space>
              <Button type='primary' htmlType='submit'>
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
        title='Add Task To Project'
        visible={addTaskDrawerOpen}
        onClose={handleAddProjectDrawerClose}
        width='450'
      >
        <TaskForm teamView={false} onFormFinish={addTask} type='Add' />
      </Drawer>
    </>
  );
}

export default ProjectPage;
