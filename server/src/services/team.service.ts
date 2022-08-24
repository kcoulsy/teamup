import { User } from '@prisma/client';
import prisma from '../lib/prisma';
import permissions from '../constants/permissions';

export const getUsersTeams = async ({ id }: User) => {
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
  // TODO can create check first

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
    },
    include: {
      users: true,
      roles: true,
      invitedUsers: true,
    },
  });
  // TODO created by

  return team;
};

interface UpdateTeamOptions {
  id: string;
  name?: string;
  description?: string;
}

export const updateTeam = async ({
  id,
  name,
  description,
}: UpdateTeamOptions) => {
  const team = await prisma.team.update({
    where: { id },
    data: { name, description },
    include: { users: true },
  });

  return team;
};

interface LeaveTeamOptions {
  userId: string;
  teamId: string;
}

export const leaveTeam = async ({ userId, teamId }: LeaveTeamOptions) => {
  await prisma.team.update({
    where: { id: teamId },
    data: { users: { disconnect: [{ id: userId }] } },
  });
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
  await prisma.team.update({
    where: { id: teamId },
    data: { invitedUsers: { connect: [{ id: user.id }] } },
  });
};

interface AcceptTeamInviteOptions {
  userId: string;
  teamId: string;
}

export const acceptTeamInvite = async ({
  userId,
  teamId,
}: AcceptTeamInviteOptions) => {
  const team = await prisma.team.update({
    where: { id: teamId },
    data: {
      invitedUsers: { disconnect: [{ id: userId }] },
      users: { connect: [{ id: userId }] },
    },
    include: {
      roles: true,
    },
  });

  if (team.roles.find((role) => role.userIDs.includes(userId))) return;

  const lastRoleId = team.roles[team.roles.length - 1].id;

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
};

interface DeclineTeamInviteOptions {
  userId: string;
  teamId: string;
}

export const declineTeamInvite = async ({
  userId,
  teamId,
}: DeclineTeamInviteOptions) => {
  await prisma.team.update({
    where: { id: teamId },
    data: {
      invitedUsers: { disconnect: [{ id: userId }] },
    },
  });
};

interface RemoveUserFromTeamOptions {
  userId: string;
  teamId: string;
}

export const removeUserFromTeam = async ({
  userId,
  teamId,
}: RemoveUserFromTeamOptions) => {
  await prisma.team.update({
    where: { id: teamId },
    data: {
      users: { disconnect: [{ id: userId }] },
    },
  });
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
    include: { roles: true },
  });
  const roleExists = team.roles.find((role) => role.id === roleId);
  if (!roleExists) throw new Error('Role does not exist');

  const user = await prisma.user.findFirst({
    where: { id: userId },
    include: { roles: true },
  });

  const currentRole = user.roles.find((role) => role.teamId === teamId);

  if (!currentRole) {
    throw new Error('User has no role in team');
  }

  await prisma.role.update({
    where: { id: currentRole.id },
    data: {
      users: { disconnect: [{ id: userId }] },
    },
  });

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
};

export const updateRolesInTeam = async () => {};

export const updatePermissionsInTeam = async () => {};
