import { LiteralUnion } from 'antd/lib/_util/type';
import { PresetStatusColorType, PresetColorType } from 'antd/lib/_util/colors';

export interface Task {
    title: string;
    description: string;
    assignee: string;
    status: TaskStatusColor;
    timeRemaining: string;
}

export interface TaskRow {
    key: string;
    title: TaskRowTitleLink;
    assignee: string;
    status: TaskStatusColor;
    timeRemaining: string;
}

export interface TaskRowTitleLink {
    label: string;
    projectId: string;
    taskId: string;
}

export interface TaskStatusColor {
    label: string;
    color: LiteralUnion<PresetColorType | PresetStatusColorType, string>;
}

export enum TaskStatus {
    NOT_STARTED = 'NOT_STARTED',
    IN_PROGRESS = 'IN_PROGRESS',
    TESTING = 'TESTING',
    PENDING_REVIEW = 'PENDING_REVIEW',
    DONE = 'DONE',
}

export const taskStatusLabel = {
    [TaskStatus.NOT_STARTED]: 'Not Started',
    [TaskStatus.IN_PROGRESS]: 'In Progress',
    [TaskStatus.TESTING]: 'Testing',
    [TaskStatus.PENDING_REVIEW]: 'Pending Review',
    [TaskStatus.DONE]: 'Done',
};
