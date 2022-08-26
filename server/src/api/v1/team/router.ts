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
  getUsersTeams,
  inviteUserToTeam,
  leaveTeam,
  removeUserFromTeam,
  updateRolesInTeam,
  updateTeam,
  updateUserRoleInTeam,
} from '../../../services/team.service';
import requireAuthentication from '../../../middleware/requireAuthentication';

const router = express.Router();

router.get(
  '/',
  requireAuthentication,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
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
      const { teamId } = req.body;

      await acceptTeamInvite({ teamId, userId: req.user.id });
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
      const { teamId } = req.body;

      await declineTeamInvite({ teamId, userId: req.user.id });
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
      const [team] = await getUsersTeams(req.user);
      const { userId, roleId } = req.body;

      await updateUserRoleInTeam({ teamId: team.id, userId, roleId });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Update roles, permissions are based off the index of the role to keep it simple.
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
      // TODO check that the user can perform this action

      // TODO check that the user isn't removing their own role
      const team = await updateRolesInTeam({
        teamId: req.body.teamId,
        roles: req.body.roles,
      });

      res.json({ team });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Update Permissions, currently using role name. Uses indexes for now.
 */
router.post(
  '/permissions',
  requireAuthentication,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send('ok');
    } catch (error) {
      next(error);
    }
    // const { roleIndex, permissions } = req.body;
    // await req.user.populateTeam(true);
    // if (roleIndex < 0 || roleIndex > req.user.team.roles.length - 1) {
    //   return res
    //     .status(400)
    //     .send({ error: 'Role does not exist with that index' });
    // }
    // req.user.team.roles.forEach((_, index) => {
    //   if (!req.user.team.rolePermissions[index]) {
    //     req.user.team.rolePermissions[index] = {
    //       permissions: [],
    //       roleIndex: index,
    //     };
    //   }
    //   if (index === roleIndex) {
    //     req.user.team.rolePermissions[index].permissions = permissions;
    //   }
    // });
    // await req.user.team.save();
    // res.send({
    //   team: req.user.team,
    //   message: 'Updated permissions',
    //   success: true,
    // });
  }
);

export default router;
