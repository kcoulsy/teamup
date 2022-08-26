import express, { NextFunction, Request, Response } from 'express';
import {
  CreateTeamBodySchema,
  createTeamBodySchema,
  UpdateTeamBodySchema,
  updateTeamBodySchema,
} from '../../validation/team';
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
} from '../../services/team.service';
import { requireAuthentication } from '../../utils/auth';

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

// TODO go through and catch errors

/**
 * Allows the user to leave the team BUT does not remove the team.
 */
router.post('/leave', requireAuthentication, async (req: Request<{}>, res) => {
  const { teamId } = req.body;

  await leaveTeam({ teamId, userId: req.user.id });
});

/**
 * Invites a user (by email) to the team
 */
router.post('/invite', requireAuthentication, async (req: Request<{}>, res) => {
  const [team] = await getUsersTeams(req.user);

  const { email } = req.body;

  await inviteUserToTeam({ email, teamId: team.id });

  return res.json({
    success: true,
    message: `User with email "${email}" invited to team successfully!`,
  });
});

/**
 * Accepts an invitation to a team
 */
router.post('/accept', requireAuthentication, async (req: Request, res) => {
  const { teamId } = req.body;

  await acceptTeamInvite({ teamId, userId: req.user.id });
});

/**
 * Declines an invite to a team
 */
router.post('/decline', requireAuthentication, async (req: Request, res) => {
  const { teamId } = req.body;

  await declineTeamInvite({ teamId, userId: req.user.id });
});

/**
 * Removes a user from the team.
 */
router.post(
  '/user/remove',
  requireAuthentication,
  async (req: Request, res) => {
    const [team] = await getUsersTeams(req.user);
    const { userId } = req.body;

    await removeUserFromTeam({ teamId: team.id, userId });
  }
);

/**
 * Updates a users role in the team.
 */
router.post(
  '/user/update',
  requireAuthentication,
  async (req: Request, res) => {
    const [team] = await getUsersTeams(req.user);
    const { userId, roleId } = req.body;

    await updateUserRoleInTeam({ teamId: team.id, userId, roleId });
  }
);

/**
 * Update roles, permissions are based off the index of the role to keep it simple.
 */
router.put('/roles', requireAuthentication, async (req: Request, res, next) => {
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
});

/**
 * Update Permissions, currently using role name. Uses indexes for now.
 */
router.post(
  '/permissions',
  requireAuthentication,
  async (req: Request, res) => {
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
