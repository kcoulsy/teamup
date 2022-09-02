import prisma from '../lib/prisma';
import { BadRequestError, NotFoundError } from '../utils/error';

export const findProjectById = async (id: string, userId: string) => {
  const foundProject = await prisma.project.findFirst({
    where: { id },
  });
  if (!foundProject) throw new NotFoundError('Project not found');

  if (foundProject.teamId) {
    const foundTeam = await prisma.team.findFirst({
      where: { id: foundProject.teamId },
      include: { users: true },
    });
    if (!foundTeam) throw new NotFoundError('Team not found');

    const foundUser = foundTeam.users.find((user) => user.id === userId);
    if (!foundUser) throw new NotFoundError('User not found on team');
  }
  return foundProject;
};

interface FindProjectOptions {
  userId: string;
  teamId?: string;
}
export const findProjects = async ({ teamId, userId }: FindProjectOptions) => {
  if (teamId) {
    const team = await prisma.team.findFirst({
      where: { id: teamId },
      include: {
        users: true,
      },
    });
    if (!team) throw new NotFoundError('Team not found');

    if (!team.users.some((user) => user.id === userId)) {
      throw new BadRequestError('User not found on team');
    }

    return await prisma.project.findMany({
      where: {
        teamId,
      },
      include: {
        team: true,
        createdBy: true,
      },
    });
  }

  return await prisma.project.findMany({
    where: {
      createdById: userId,
    },
    include: {
      team: true,
      createdBy: true,
    },
  });
};

interface CreateProjectOptions {
  title: string;
  description: string;
  teamId?: string;
  userId: string;
}
export const createProject = async ({
  title,
  description,
  teamId,
  userId,
}: CreateProjectOptions) => {
  if (teamId) {
    const team = await prisma.team.findFirst({
      where: { id: teamId },
      include: { users: true },
    });
    if (!team) throw new NotFoundError('Team not found');

    if (!team.users.some((user) => user.id === userId)) {
      throw new BadRequestError('User not found on team');
    }
    // TODO check if user has permissions on team
  }

  const project = await prisma.project.create({
    data: {
      title,
      description,
      createdBy: {
        connect: {
          id: userId,
        },
      },
      ...(teamId && {
        team: {
          connect: {
            id: teamId,
          },
        },
      }),
    },
    include: {
      team: true,
      createdBy: true,
    },
  });

  return project;
};

interface UpdateProjectOptions {
  id: string;
  title: string;
  description: string;
  userId: string;
}

export const updateProject = async ({
  id,
  title,
  description,
  userId,
}: UpdateProjectOptions) => {
  const project = await findProjectById(id, userId);
  if (!project) throw new NotFoundError('Project not found');

  // TODO check if user has permissions on team

  const updatedProject = await prisma.project.update({
    where: { id },
    data: {
      title,
      description,
    },
    include: {
      team: true,
      createdBy: true,
    },
  });

  return updatedProject;
};

interface DeleteProjectOptions {
  id: string;
  userId: string;
}

export const deleteProject = async ({ id, userId }: DeleteProjectOptions) => {
  const project = await findProjectById(id, userId);
  if (!project) throw new NotFoundError('Project not found');

  // TODO check if user has permissions on team

  const deletedProject = await prisma.project.delete({
    where: { id },
    include: {
      team: true,
      createdBy: true,
    },
  });

  return deletedProject;
};
