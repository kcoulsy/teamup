import { Role, User } from '@prisma/client';
import prisma from '../lib/prisma';
import permissions from '../constants/permissions';
import { BadRequestError } from '../utils/error';
import { USER_MAX_TEAMS } from '../constants/team';

export const getUsersTeams = async ({ id }: User) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        teams: {
          include: {
            users: true,
            roles: true,
          },
        },
      },
    });

    return user.teams;
  } catch (error) {
    throw new BadRequestError('Unable to get user teams');
  }
};

interface CreateTeamOptions {
  name: string;
  description: string;
  user: User;
}

export const createTeam = async ({
  name,
  description,
  user,
}: CreateTeamOptions) => {
  const userObj = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
    include: {
      teams: true,
    },
  });

  if (!userObj) {
    throw new BadRequestError('User not found');
  }

  if (userObj.teams.length >= USER_MAX_TEAMS) {
    throw new BadRequestError('User has too many teams');
  }

  try {
    const defaultRole = await prisma.role.create({
      data: {
        name: 'Project Manager',
        permissions: [...Object.values(permissions)],
        users: {
          connect: [{ id: user.id }],
        },
        order: 0,
      },
    });

    const team = await prisma.team.create({
      data: {
        name,
        description,
        users: {
          connect: [{ id: user.id }],
        },
        roles: {
          connect: [{ id: defaultRole.id }],
        },
        createdBy: {
          connect: { id: user.id },
        },
      },
      include: {
        users: true,
        roles: true,
        invitedUsers: true,
      },
    });

    return team;
  } catch (error) {
    throw new BadRequestError('Unable to create team');
  }
};

interface UpdateTeamOptions {
  id: string;
  name?: string;
  description?: string;
  user: User;
}

// TODO - minimum name length
export const updateTeam = async ({
  id,
  name,
  description,
  user,
}: UpdateTeamOptions) => {
  const team = await prisma.team.update({
    where: { id },
    data: { name, description },
    include: { users: true, roles: { include: { users: true } } },
  });

  if (!team) {
    throw new BadRequestError('Team not found');
  }

  if (!team.users.find(({ id }) => id === user.id)) {
    throw new BadRequestError('User is not part of team');
  }

  const userRole = team.roles.find(({ users }) =>
    users.find(({ id }) => id === user.id)
  );

  if (!userRole) {
    throw new BadRequestError('User is not part of team');
  }

  if (!userRole.permissions.includes(permissions.PERM_UPDATE_TEAM_DETAILS)) {
    throw new BadRequestError('User does not have permission to update team');
  }

  return team;
};

interface LeaveTeamOptions {
  userId: string;
  teamId: string;
}

export const leaveTeam = async ({ userId, teamId }: LeaveTeamOptions) => {
  try {
    return await prisma.team.update({
      where: { id: teamId },
      data: { users: { disconnect: [{ id: userId }] } },
    });
  } catch (error) {
    throw new BadRequestError('Something went wrong trying to leave the team');
  }
};

interface InviteToTeamOptions {
  email: string;
  teamId: string;
}

export const inviteUserToTeam = async ({
  email,
  teamId,
}: InviteToTeamOptions) => {
  const user = await prisma.user.findFirst({
    where: { email },
  });
  if (!user) {
    throw new BadRequestError('User not found');
  }
  const team = await prisma.team.findFirst({
    where: { id: teamId },
    include: { users: true },
  });

  if (!team) {
    throw new BadRequestError('Team not found');
  }

  if (team.users.find(({ id }) => id === user.id)) {
    throw new BadRequestError('User is already part of team');
  }

  try {
    return await prisma.team.update({
      where: { id: teamId },
      data: { invitedUsers: { connect: [{ id: user.id }] } },
    });
  } catch (error) {
    throw new BadRequestError('Something went wrong trying to invite user');
  }
};

interface AcceptTeamInviteOptions {
  userId: string;
  teamId: string;
}

export const acceptTeamInvite = async ({
  userId,
  teamId,
}: AcceptTeamInviteOptions) => {
  const team = await prisma.team.findFirst({
    where: { id: teamId },
    include: { users: true, invitedUsers: true },
  });

  if (!team) {
    throw new BadRequestError('Team not found');
  }

  if (!team.invitedUsers.find(({ id }) => id === userId)) {
    throw new BadRequestError('User is not invited to team');
  }

  if (team.users.find(({ id }) => id === userId)) {
    throw new BadRequestError('User is already part of team');
  }

  try {
    const updatedTeam = await prisma.team.update({
      where: { id: teamId },
      data: {
        invitedUsers: { disconnect: [{ id: userId }] },
        users: { connect: [{ id: userId }] },
      },
      include: {
        roles: true,
      },
    });

    if (updatedTeam.roles.find((role) => role.userIDs.includes(userId))) {
      return updatedTeam;
    }

    const lastRoleId = updatedTeam.roles[updatedTeam.roles.length - 1].id;

    await prisma.role.update({
      where: {
        id: lastRoleId,
      },
      data: {
        users: {
          connect: [{ id: userId }],
        },
      },
    });

    return await prisma.team.findFirst({
      where: { id: teamId },
      include: { users: true, roles: true },
    });
  } catch (error) {
    throw new BadRequestError('Something went wrong trying to accept invite');
  }
};

interface DeclineTeamInviteOptions {
  userId: string;
  teamId: string;
}

export const declineTeamInvite = async ({
  userId,
  teamId,
}: DeclineTeamInviteOptions) => {
  try {
    const team = await prisma.team.findFirst({
      where: { id: teamId },
      include: { invitedUsers: true },
    });

    if (!team) {
      throw new BadRequestError('Team not found');
    }

    if (!team.invitedUsers.find(({ id }) => id === userId)) {
      throw new BadRequestError('User is not invited to team');
    }

    return await prisma.team.update({
      where: { id: teamId },
      data: {
        invitedUsers: { disconnect: [{ id: userId }] },
      },
    });
  } catch (error) {
    throw new BadRequestError('Something went wrong trying to decline invite');
  }
};

interface RemoveUserFromTeamOptions {
  userId: string;
  teamId: string;
}

export const removeUserFromTeam = async ({
  userId,
  teamId,
}: RemoveUserFromTeamOptions) => {
  const team = await prisma.team.findFirst({
    where: { id: teamId },
    include: { users: true },
  });

  if (!team) {
    throw new BadRequestError('Team not found');
  }

  if (!team.users.find(({ id }) => id === userId)) {
    throw new BadRequestError('User is not part of team');
  }

  try {
    return await prisma.team.update({
      where: { id: teamId },
      data: {
        users: { disconnect: [{ id: userId }] },
      },
    });
  } catch (error) {
    throw new BadRequestError('Something went wrong trying to remove user');
  }
};

interface UpdateUserRoleInTeam {
  userId: string;
  roleId: string;
  teamId: string;
}

export const updateUserRoleInTeam = async ({
  userId,
  roleId,
  teamId,
}: UpdateUserRoleInTeam) => {
  const team = await prisma.team.findFirst({
    where: { id: teamId },
    include: { roles: true, users: true },
  });

  if (!team) {
    throw new BadRequestError('Team not found');
  }

  if (!team.users.find(({ id }) => id === userId)) {
    throw new BadRequestError('User is not part of team');
  }

  const userRole = team.roles.find(({ id }) => id === roleId);

  if (!userRole) {
    throw new BadRequestError('Role not found or not for this team');
  }

  const user = await prisma.user.findFirst({
    where: { id: userId },
    include: { roles: true },
  });

  const currentRole = user.roles.find((role) => role.teamId === teamId);

  if (currentRole) {
    try {
      await prisma.role.update({
        where: { id: currentRole.id },
        data: {
          users: { disconnect: [{ id: userId }] },
        },
      });
    } catch (error) {
      throw new BadRequestError(
        'Something went wrong trying remove the users existing role'
      );
    }
  }

  try {
    await prisma.role.update({
      where: {
        id: roleId,
      },
      data: {
        users: {
          connect: [{ id: userId }],
        },
      },
    });
  } catch (error) {
    throw new BadRequestError(
      'Something went wrong trying to update the users role'
    );
  }

  return await prisma.team.findFirst({
    where: { id: teamId },
    include: { roles: true, users: true },
  });
};

interface UpdateRolesInTeamOptions {
  teamId: string;
  roles: Role[];
}
export const updateRolesInTeam = async ({
  teamId,
  roles,
}: UpdateRolesInTeamOptions) => {
  const team = await prisma.team.findFirst({
    where: { id: teamId },
    include: { roles: true },
  });

  if (!team) {
    throw new BadRequestError('Team not found');
  }

  const removedRoles = team.roles.filter(
    ({ id }) => !roles.find(({ id }) => id === id)
  );

  // TODO - fix not being able to remove role
  try {
    await prisma.team.update({
      where: { id: teamId },
      data: {
        roles: { disconnect: removedRoles.map(({ id }) => ({ id })) },
      },
    });

    await removedRoles.reduce(async (prev, role) => {
      await prev;
      await prisma.role.delete({
        where: { id: role.id },
      });
    }, Promise.resolve());
  } catch (error) {
    throw new BadRequestError(
      'Something went wrong trying to remove roles from team'
    );
  }

  console.log(team.roles.map(({ id }) => id));
  console.log(roles.map(({ id }) => id));
  await roles.reduce(async (prev, role) => {
    await prev;

    if (!team.roles.find(({ id }) => id === role.id)) {
      return prisma.role.create({
        data: {
          name: role.name,
          order: role.order,
          permissions: role.permissions,
          team: { connect: { id: teamId } },
        },
      });
    }

    const { name, order, permissions } = roles.find(({ id }) => id === role.id);

    return prisma.role.update({
      where: { id: role.id },
      data: {
        name,
        order,
        permissions,
      },
    });
  }, Promise.resolve({}) as Promise<Role>);

  return await prisma.team.findFirst({
    where: { id: teamId },
    include: { roles: true },
  });
};

export const updatePermissionsInTeam = async () => {};
