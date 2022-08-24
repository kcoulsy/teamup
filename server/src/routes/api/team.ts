import express from 'express';
import Team from '../../models/team.model';
import User from '../../models/user.model';
import Authenticate from '../../middleware/authenticate';
import PERMISSIONS from '../../constants/permissions';
import { RequestWithUser } from '../../types/express';
import {
  acceptTeamInvite,
  createTeam,
  declineTeamInvite,
  getUsersTeams,
  inviteUserToTeam,
  leaveTeam,
  removeUserFromTeam,
  updateTeam,
  updateUserRoleInTeam,
} from '../../services/team.service';
import { RES_AUTH_HEADER } from '../../constants/auth';
import { authWithToken } from '../../services/auth.service';

const router = express.Router();

// @TODO - Need to try catch all over the place
router.get('/', async (req: RequestWithUser, res) => {
  const token = req.header(RES_AUTH_HEADER);
  const user = await authWithToken(token);

  const teams = await getUsersTeams(user);

  res.json({ teams });
});

router.post('/create', async (req: RequestWithUser, res) => {
  const token = req.header(RES_AUTH_HEADER);
  const user = await authWithToken(token);
  const { name, description } = req.body;

  const team = await createTeam({ name, description, user });

  res.send({ team });
});

router.put('/update', async (req: RequestWithUser, res) => {
  const team = await updateTeam({
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
  });

  res.send({ team });
});

/**
 * Allows the user to leave the team BUT does not remove the team.
 */
router.post('/leave', async (req: RequestWithUser, res) => {
  const token = req.header(RES_AUTH_HEADER);
  const user = await authWithToken(token);
  const { teamId } = req.body;

  await leaveTeam({ teamId, userId: user.id });
});

/**
 * Invites a user (by email) to the team
 */
router.post('/invite', async (req: RequestWithUser, res) => {
  const token = req.header(RES_AUTH_HEADER);
  const user = await authWithToken(token);
  const [team] = await getUsersTeams(user);

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
router.post('/accept', async (req: RequestWithUser, res) => {
  const token = req.header(RES_AUTH_HEADER);
  const user = await authWithToken(token);
  const { teamId } = req.body;

  await acceptTeamInvite({ teamId, userId: user.id });
});

/**
 * Declines an invite to a team
 */
router.post('/decline', async (req: RequestWithUser, res) => {
  const token = req.header(RES_AUTH_HEADER);
  const user = await authWithToken(token);
  const { teamId } = req.body;

  await declineTeamInvite({ teamId, userId: user.id });
});

/**
 * Removes a user from the team.
 */
router.post('/user/remove', async (req: RequestWithUser, res) => {
  const token = req.header(RES_AUTH_HEADER);
  const user = await authWithToken(token);
  const [team] = await getUsersTeams(user);
  const { userId } = req.body;

  await removeUserFromTeam({ teamId: team.id, userId });
});

/**
 * Updates a users role in the team.
 */
router.post('/user/update', async (req: RequestWithUser, res) => {
  const token = req.header(RES_AUTH_HEADER);
  const user = await authWithToken(token);
  const [team] = await getUsersTeams(user);
  const { userId, roleId } = req.body;

  await updateUserRoleInTeam({ teamId: team.id, userId, roleId });
});

/**
 * Update roles, permissions are based off the index of the role to keep it simple.
 */
router.post('/roles', Authenticate, async (req: RequestWithUser, res) => {
  // const { roles } = req.body;
  // if (!Array.isArray(roles) || !roles.every((i) => typeof i === 'string')) {
  //   return res.status(400).send('Roles must be of type strings');
  // }
  // await req.user.populateTeam();
  // req.user.team.roles = roles;
  // const newRolePerms = roles.map((_, index) => {
  //   if (typeof req.user.team.rolePermissions[index] !== 'undefined') {
  //     const roleObj = req.user.team.rolePermissions[index];
  //     roleObj.roleIndex = index;
  //     return roleObj;
  //   }
  //   return {
  //     roleIndex: index,
  //     permissions: [],
  //   };
  // });
  // req.user.team.rolePermissions = newRolePerms;
  // req.user.team.save();
  // res.json({ message: 'updated roles', success: true });
});

/**
 * Update Permissions, currently using role name. Uses indexes for now.
 */
router.post('/permissions', Authenticate, async (req: RequestWithUser, res) => {
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
});

export default router;
