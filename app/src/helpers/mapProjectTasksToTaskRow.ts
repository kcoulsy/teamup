import { TaskRow } from '../types/task';
import getTaskStatusColourObj from './getTaskStatusColourObj';

// tasks any as it's coming from the api
export default (tasks: any, projectId: string): TaskRow[] => {
  if (!tasks) return [];
  return (
    tasks.map((projectTask: any) => {
      return {
        key: projectTask._id,
        title: {
          label: projectTask.title,
          projectId,
          taskId: projectTask._id,
        },
        description: projectTask.description,
        status: getTaskStatusColourObj(projectTask.status),
        assignee: projectTask.assignee ? projectTask.assignee : 'Unassigned',
        timeRemaining: projectTask.estimatedHours,
      };
    }) || []
  );
};
