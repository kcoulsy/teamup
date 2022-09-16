import React, { useState } from 'react';
import {
  Button, Drawer, notification, Modal,
} from 'antd';
import { ArrowRightOutlined, EditOutlined } from '@ant-design/icons';
import { useParams, useHistory } from 'react-router-dom';
import TaskView from '../components/TaskView/TaskView';
import { Task, TaskStatus, taskStatusLabel } from '../types/task';
import TaskForm from '../components/TaskForm/TaskForm';
import { api } from '../services/api';
import {
  PERM_EDIT_OTHER_TASK,
  PERM_DELETE_OTHER_TASK,
} from '../constants/permissions';
import PageLayout from '../components/PageLayout/PageLayout';
import useToggle from '../hooks/useToggle';
import useUser from '../hooks/useUser';
import useTeams from '../hooks/useTeams';

const { confirm } = Modal;

function TaskPage() {
  const { data } = useUser();
  const { hasPermission } = useTeams();
  const loggedInUser = data;

  const canEditOthersTasks = hasPermission(PERM_EDIT_OTHER_TASK);
  const canDeleteOthersTasks = hasPermission(PERM_DELETE_OTHER_TASK);
  const { projectid, taskid } = useParams<{
    projectid: string;
    taskid: string;
  }>();
  const history = useHistory();
  const [modalVisible, toggleModal] = useToggle();
  const [task] = useState<Task | undefined>();
  const createdByLoggedInUser = task?.createdBy === loggedInUser?.user.id;
  const [loading] = useState(false);

  //   useEffect(() => {
  //     setLoading(true);
  //     fetchTask(taskid)
  //       .then((task) => {
  //         setLoading(false);
  //         setTask(task);
  //       })
  //       .catch(() => {
  //         setLoading(false);
  //         setTask(undefined);
  //       });
  //   }, [taskid]);

  const handleEditTask = () => {
    // updateTask(taskid, values)
    //   .then((task) => {
    //     notification.success({
    //       message: 'Task updated successfully!',
    //       placement: 'bottomRight',
    //     });
    //     setTask(task);
    //   })
    //   .catch((e) => {
    //     notification.error({
    //       message: 'Something went wrong updating!',
    //       placement: 'bottomRight',
    //     });
    //     setTask(undefined);
    //   })
    //   .finally(() => toggleModal(false));
  };

  let headerButtons = [];

  if (createdByLoggedInUser || canEditOthersTasks) {
    headerButtons.push(
      <Button key='editTask' onClick={toggleModal}>
        Edit Task
        {' '}
        <EditOutlined />
      </Button>,
    );
  }

  if (task) {
    const statuses = Object.values(TaskStatus);
    const indexOfCurrentStatus = Object.values(taskStatusLabel).indexOf(
      task.status.label,
    );

    const canMoveToNextStatus = indexOfCurrentStatus + 1 <= statuses.length - 1;

    if (canMoveToNextStatus) {
      const nextStatus = statuses[indexOfCurrentStatus + 1];
      const nextStatusLabel = `Move to ${taskStatusLabel[nextStatus]}`;
      headerButtons = [
        ...headerButtons,
        <Button
          type='primary'
          key='nextStatus'
          onClick={() => handleEditTask({ status: nextStatus })}
        >
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
        loading={loading}
      >
        <TaskView task={task} />
      </PageLayout>
      <Drawer
        title='Edit Project Task'
        visible={modalVisible}
        onClose={toggleModal}
        width='450'
      >
        <TaskForm
          onFormFinish={async (values) => {
            toggleModal(false);
            handleEditTask(values);
          }}
          type='Edit'
          initialValues={task}
          teamView={!!task?.project.team}
        />
        {(createdByLoggedInUser || canDeleteOthersTasks) && (
          <Button
            danger
            onClick={() => {
              confirm({
                title: 'Delete Task',
                content: 'Are you sure you want to delete this task?',
                onOk: async () => {
                  const res = await api(`/task/${taskid}`, 'DELETE');
                  if (res) {
                    toggleModal(false);
                    notification.success({
                      message: 'Task deleted!',
                      placement: 'bottomRight',
                    });
                    history.push(`/project/${projectid}`);
                  }
                },
              });
            }}
          >
            Delete Task
          </Button>
        )}
      </Drawer>
    </>
  );
}

export default TaskPage;
