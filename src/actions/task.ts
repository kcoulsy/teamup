import { Task } from './../types/task';
import { api } from './../services/api';
import getTaskStatusColourObj from '../helpers/getTaskStatusColourObj';

export const fetchTask = (taskId: string): Promise<Task | undefined> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await api(`/task/${taskId}`, 'GET');

            if (res) {
                const task: Task = {
                    title: res.task.title,
                    description: res.task.description,
                    assignee: res.task.assignee,
                    timeRemaining: res.task.estimatedHours,
                    status: getTaskStatusColourObj(res.task.status),
                };
                resolve(task);
            } else {
                reject(undefined);
            }
        } catch (err) {
            reject(undefined);
        }
    });
};
