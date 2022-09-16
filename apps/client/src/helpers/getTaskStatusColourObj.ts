import { TaskStatusColor, TaskStatus, taskStatusLabel } from '../types/task';

export default (status: string): TaskStatusColor => {
  switch (status) {
    case TaskStatus.NOT_STARTED:
      return {
        color: 'red',
        label: taskStatusLabel[TaskStatus.NOT_STARTED],
      };
    case TaskStatus.IN_PROGRESS:
      return {
        color: 'orange',
        label: taskStatusLabel[TaskStatus.IN_PROGRESS],
      };
    case TaskStatus.PENDING_REVIEW:
      return {
        color: 'purple',
        label: taskStatusLabel[TaskStatus.PENDING_REVIEW],
      };
    case TaskStatus.TESTING:
      return {
        color: 'blue',
        label: taskStatusLabel[TaskStatus.TESTING],
      };
    case TaskStatus.DONE:
      return {
        color: 'green',
        label: taskStatusLabel[TaskStatus.DONE],
      };
    default:
      return {
        color: 'red',
        label: 'N/A',
      };
  }
};
