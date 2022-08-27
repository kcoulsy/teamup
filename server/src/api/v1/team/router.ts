import express, { NextFunction, Request, Response } from 'express';
import {
  AcceptTeamInviteBodySchema,
  acceptTeamInviteBodySchema,
  CreateTeamBodySchema,
  createTeamBodySchema,
  InviteUserToTeamBodySchema,
  inviteUserToTeamBodySchema,
  LeaveTeamBodySchema,
  leaveTeamBodySchema,
  RejectTeamInviteBodySchema,
  rejectTeamInviteBodySchema,
  RemoveUserFromTeamBodySchema,
  removeUserFromTeamBodySchema,
  UpdateRoleSchema,
  updateRoleSchema,
  UpdateRolesInTeamBodySchema,
  updateRolesInTeamBodySchema,
  UpdateTeamBodySchema,
  updateTeamBodySchema,
  UpdateUserRoleInTeamBodySchema,
  updateUserRoleInTeamBodySchema,
} from './validation';
import { validateRequest } from 'zod-express-middleware';
import {
  acceptTeamInvite,
  createTeam,
  declineTeamInvite,
  getUserRoleInTeam,
  getUsersTeams,
  inviteUserToTeam,
  leaveTeam,
  removeUserFromTeam,
  updateRoleInTeam,
  updateRolesInTeam,
  updateTeam,
  updateUserRoleInTeam,
} from '../../../services/team.service';
import requireAuthentication from '../../../middleware/requireAuthentication';
import {
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
} from '../../../utils/error';
import { PERM_UPDATE_TEAM_DETAILS } from '../../../constants/permissions';

// TODO - remove passwords from users

const router = express.Router();

router.get(
  '/',
  requireAuthentication,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new UnauthorizedError();

      const teams = await getUsersTeams(req.user);

      res.json({ teams });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/create',
  requireAuthentication,
  validateRequest({
    body: createTeamBodySchema,
  }),
  async (
    req: Request<{}, {}, CreateTeamBodySchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) throw new UnauthorizedError();

      const { name, description } = req.body;

      const team = await createTeam({ name, description, user: req.user });

      res.send({ team });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/update',
  requireAuthentication,
  validateRequest({ body: updateTeamBodySchema }),
  async (
    req: Request<{}, {}, UpdateTeamBodySchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) throw new UnauthorizedError();

      const team = await updateTeam({
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        user: req.user,
      });

      res.send({ team });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Allows the user to leave the team BUT does not remove the team.
 */
router.post(
  '/leave',
  requireAuthentication,
  validateRequest({ body: leaveTeamBodySchema }),
  async (
    req: Request<{}, {}, LeaveTeamBodySchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) throw new UnauthorizedError();

      const { teamId } = req.body;

      await leaveTeam({ teamId, userId: req.user.id });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Invites a user (by email) to the team
 */
router.post(
  '/invite',
  requireAuthentication,
  validateRequest({ body: inviteUserToTeamBodySchema }),
  async (
    req: Request<{}, {}, InviteUserToTeamBodySchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) throw new UnauthorizedError();

      const [team] = await getUsersTeams(req.user);

      const { email } = req.body;

      await inviteUserToTeam({ email, teamId: team.id });

      return res.json({
        success: true,
        message: `User with email "${email}" invited to team successfully!`,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Accepts an invitation to a team
 */
router.post(
  '/accept',
  requireAuthentication,
  validateRequest({ body: acceptTeamInviteBodySchema }),
  async (
    req: Request<{}, {}, AcceptTeamInviteBodySchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) throw new UnauthorizedError();

      const { teamId } = req.body;

      await acceptTeamInvite({ teamId, userId: req.user.id });

      return res.json({
        success: true,
        message: `You have accepted the invitation to team "${teamId}"!`,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Declines an invite to a team
 */
router.post(
  '/reject',
  requireAuthentication,
  validateRequest({ body: rejectTeamInviteBodySchema }),
  async (
    req: Request<{}, {}, RejectTeamInviteBodySchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) throw new UnauthorizedError();

      const { teamId } = req.body;

      await declineTeamInvite({ teamId, userId: req.user.id });

      return res.json({
        success: true,
        message: `You have declined the invitation to team "${teamId}"!`,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Removes a user from the team.
 */
router.post(
  '/user/remove',
  requireAuthentication,
  validateRequest({ body: removeUserFromTeamBodySchema }),
  async (
    req: Request<{}, {}, RemoveUserFromTeamBodySchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) throw new UnauthorizedError();

      const [team] = await getUsersTeams(req.user);
      const { userId } = req.body;

      await removeUserFromTeam({ teamId: team.id, userId });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Updates a users role in the team.
 */
router.post(
  '/user/update',
  requireAuthentication,
  validateRequest({ body: updateUserRoleInTeamBodySchema }),
  async (
    req: Request<{}, {}, UpdateUserRoleInTeamBodySchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) throw new UnauthorizedError();

      const [team] = await getUsersTeams(req.user);
      const { userId, roleId } = req.body;

      await updateUserRoleInTeam({ teamId: team.id, userId, roleId });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Update roles
 */
router.put(
  '/roles',
  requireAuthentication,
  validateRequest({ body: updateRolesInTeamBodySchema }),
  async (
    req: Request<{}, {}, UpdateRolesInTeamBodySchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) throw new UnauthorizedError();

      const [team] = await getUsersTeams(req.user);

      try {
        const userRole = await getUserRoleInTeam({
          teamId: team.id,
          userId: req.user.id,
        });

        if (!userRole)
          throw new ForbiddenError('You are not part of this roles team');

        if (!userRole.permissions.includes(PERM_UPDATE_TEAM_DETAILS)) {
          throw new ForbiddenError(
            'You do not have permission to update roles in this team'
          );
        }

        if (!req.body.roles.find((r) => r.id === userRole.id)) {
          throw new BadRequestError('You cannot remove your own role');
        }
      } catch (error) {
        throw new ForbiddenError(
          'You do not have permission to update roles in this team'
        );
      }

      const updatedTeam = await updateRolesInTeam({
        teamId: req.body.teamId,
        roles: req.body.roles,
      });

      res.json({ team: updatedTeam });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Update the role with name, order and permissions
 */
router.put(
  '/role',
  requireAuthentication,
  validateRequest({ body: updateRoleSchema }),
  async (
    req: Request<{}, {}, UpdateRoleSchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) throw new UnauthorizedError();

      await updateRoleInTeam(req.body.role);

      const [team] = await getUsersTeams(req.user);
      res.json({ team });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
