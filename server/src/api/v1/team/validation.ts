import { z } from 'zod';

export const createTeamBodySchema = z.object({
  name: z.string(),
  description: z.string(),
});

export type CreateTeamBodySchema = z.infer<typeof createTeamBodySchema>;

export const updateTeamBodySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export type UpdateTeamBodySchema = z.infer<typeof updateTeamBodySchema>;

export const leaveTeamBodySchema = z.object({
  teamId: z.string(),
});

export type LeaveTeamBodySchema = z.infer<typeof leaveTeamBodySchema>;

export const inviteUserToTeamBodySchema = z.object({
  email: z.string().email(),
});

export type InviteUserToTeamBodySchema = z.infer<
  typeof inviteUserToTeamBodySchema
>;

export const acceptTeamInviteBodySchema = z.object({
  teamId: z.string(),
});

export type AcceptTeamInviteBodySchema = z.infer<
  typeof acceptTeamInviteBodySchema
>;

export const rejectTeamInviteBodySchema = z.object({
  teamId: z.string(),
});

export type RejectTeamInviteBodySchema = z.infer<
  typeof rejectTeamInviteBodySchema
>;

export const removeUserFromTeamBodySchema = z.object({
  userId: z.string(),
});

export type RemoveUserFromTeamBodySchema = z.infer<
  typeof removeUserFromTeamBodySchema
>;

export const updateUserRoleInTeamBodySchema = z.object({
  userId: z.string(),
  roleId: z.string(),
});

export type UpdateUserRoleInTeamBodySchema = z.infer<
  typeof updateUserRoleInTeamBodySchema
>;

// TODO type this properly
export const updateRolesInTeamBodySchema = z.object({
  teamId: z.string(),
  roles: z.array(z.any()),
});

export type UpdateRolesInTeamBodySchema = z.infer<
  typeof updateRolesInTeamBodySchema
>;
