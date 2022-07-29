import Task, { TaskStatus } from '../models/task.model';
import Project from '../models/project.model';
import userModel from '../models/user.model';

const findOne = async (_id: string) => {
  const task = await Task.findOne({ _id });
  await task.populate('project').execPopulate();
  await task.populate('assignee').execPopulate();
  return task;
};

interface createOneOptions {
  title: string;
  description: string;
  estimatedHours: string;
  status: TaskStatus;
  assignee: string;
  project: string;
  userId: string;
}

const create = async ({
  title,
  description,
  estimatedHours,
  status,
  assignee,
  project,
  userId,
}: createOneOptions) => {
  if (status && !Object.values(TaskStatus).includes(status)) {
    throw new Error(
      `Status must be one of the following: ${Object.values(TaskStatus).join(
        ' '
      )}`
    );
  }

  const foundProject = await Project.findById(project);

  if (!foundProject) {
    throw new Error('Project not found');
  }

  const task = new Task({
    title,
    description,
    estimatedHours,
    status,
    assignee,
    project,
    createdBy: userId,
    tasks: [],
  });

  if (!foundProject.team) {
    // @ts-ignore bad typing
    task.assignee = userId;
  }

  await task.save();

  foundProject.tasks = [...foundProject.tasks, task];
  await foundProject.save();

  return task;
};

interface UpdateOptions {
  title: string;
  description: string;
  assignee: string;
  status: TaskStatus;
  estimatedHours: number;
  _id: string;
}

const update = async ({
  title,
  description,
  assignee,
  status,
  estimatedHours,
  _id,
}: UpdateOptions) => {
  if (status && !Object.values(TaskStatus).includes(status)) {
    throw new Error(
      `Status must be one of the following: ${Object.values(TaskStatus).join(
        ' '
      )}`
    );
  }

  const task = await Task.findOne({ _id });
  if (title) {
    task.title = title;
  }
  if (description) {
    task.description = description;
  }
  if (assignee) {
    const user = await userModel.findOne({ _id: assignee });

    if (!user) {
      throw new Error('That user does not exist');
    }

    // @ts-ignore
    task.assignee = assignee;
  }
  if (estimatedHours) {
    task.estimatedHours = estimatedHours;
  }
  if (status) {
    task.status = status;
  }
  await task.save();
  await task.populate('project').execPopulate();

  return task;
};

const deleteOne = async (_id: string, userId: string) => {
  const task = await Task.findOne({ _id });

  // @ts-ignore
  if (!task.createdBy.equals(userId)) {
    throw new Error('Not your task!');
  }

  try {
    await task.deleteOne();
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

const TaskService = {
  findOne,
  create,
  update,
  deleteOne,
};

export default TaskService;
