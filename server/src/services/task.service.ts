import prisma from '../lib/prisma';
import { NotFoundError } from '../utils/error';

enum TaskStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING_REVIEW = 'PENDING_REVIEW',
  TESTING = 'TESTING',
  DONE = 'DONE',
}

export const findTaskById = async (id: string) => {
  // TODO Validate if user can see this task
  // TODO hide passwords
  return await prisma?.task.findFirst({
    where: {
      id,
    },
    include: {
      project: true,
      createdBy: true,
      assignee: true,
    },
  });
};

interface createOneOptions {
  title: string;
  description: string;
  estimatedHours: number;
  status: TaskStatus;
  assigneeId: string;
  projectId: string;
  userId: string;
}

export const createTask = async ({
  title,
  description,
  estimatedHours,
  status,
  assigneeId,
  projectId,
  userId,
}: createOneOptions) => {
  if (status && !Object.values(TaskStatus).includes(status)) {
    throw new Error(
      `Status must be one of the following: ${Object.values(TaskStatus).join(
        ' '
      )}`
    );
  }

  const foundProject = await prisma?.project.findFirst({
    where: {
      id: projectId,
    },
  });

  if (!foundProject) {
    throw new NotFoundError('Project not found');
  }

  let assignee = assigneeId || null;

  if (foundProject.teamId) {
    const foundTeam = await prisma?.team.findFirst({
      where: {
        id: foundProject.teamId,
      },
      include: { users: true },
    });

    if (!foundTeam) {
      throw new NotFoundError(
        'Something went wrong. Team not found but it exists on project.'
      );
    }

    const foundUser = foundTeam.users.find((user) => user.id === assigneeId);

    if (!foundUser) {
      throw new NotFoundError('Assignee User not found on team');
    }

    assignee = foundUser.id;
  } else {
    const foundUser = await prisma?.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!foundUser) {
      throw new NotFoundError('User not found');
    }

    assignee = foundUser.id;
  }

  const task = await prisma?.task.create({
    data: {
      title,
      description,
      estimatedHours,
      status,
      assignee: {
        connect: {
          id: assignee,
        },
      },
      project: {
        connect: {
          id: projectId,
        },
      },
      createdBy: {
        connect: {
          id: userId,
        },
      },
    },
    include: {
      project: true,
      createdBy: true,
      assignee: true,
    },
  });

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

export const updateTask = async ({
  title,
  description,
  assignee,
  status,
  estimatedHours,
  _id,
}: UpdateOptions) => {
  // if (status && !Object.values(TaskStatus).includes(status)) {
  //   throw new Error(
  //     `Status must be one of the following: ${Object.values(TaskStatus).join(
  //       ' '
  //     )}`
  //   );
  // }
  // const task = await Task.findOne({ _id });
  // if (!task) {
  //   throw new Error('Task not found');
  // }
  // if (title) {
  //   task.title = title;
  // }
  // if (description) {
  //   task.description = description;
  // }
  // if (assignee) {
  //   // const user = await userModel.findOne({ _id: assignee });
  //   // if (!user) {
  //   //   throw new Error('That user does not exist');
  //   // }
  //   // @ts-ignore
  //   task.assignee = assignee;
  // }
  // if (estimatedHours) {
  //   task.estimatedHours = estimatedHours;
  // }
  // if (status) {
  //   task.status = status;
  // }
  // await task.save();
  // await task.populate('project').execPopulate();
  // return task;
};

export const deleteTask = async (id: string, userId: string) => {
  const task = await prisma.task.findFirst({
    where: {
      id,
    },
    include: {
      createdBy: true,
      project: true,
    },
  });

  if (!task) {
    throw new NotFoundError('Task not found');
  }

  if (task.createdBy.id !== userId) {
    throw new Error('You are not the owner of this task');
  }

  // TODO or if use has permissions

  const deletedTask = await prisma.task.delete({
    where: {
      id,
    },
  });

  return deletedTask;
};
