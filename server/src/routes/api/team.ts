import express from 'express';
import Team from '../../models/team.model';
import User from '../../models/user.model';
import Authenticate from '../../middleware/authenticate';
import PERMISSIONS from '../../constants/permissions';
import { RequestWithUser } from '../../types/express';

const router = express.Router();

/**
 * Returns the team from the user that made the call.
 */
router.get('/', Authenticate, async (req: RequestWithUser, res) => {
  await req.user.populateTeam(true);
  res.json({ team: req.user.team });
});

/**
 * Creates a team from the user that made the call.
 * Fails if already in a team
 */
router.post('/create', Authenticate, async (req: RequestWithUser, res) => {
  if (req.user.team) {
    return res.send({
      message: 'User already has a team!',
      user: req.user,
    });
  }

  const { name, description } = req.body;

  const team = new Team({
    name,
    description,
    users: [
      {
        user: req.user._id,
        roleIndex: 0,
      },
    ],
    roles: ['Project Manager'],
    rolePermissions: [
      {
        roleIndex: 0,
        permissions: [...Object.values(PERMISSIONS)],
      },
    ],
  });

  await team.save();

  req.user.team = team._id;
  await req.user.save();

  await req.user.populateTeam(true);
  res.send({ team: req.user.team });
});

/**
 * Allows the user to update the team name and description
 */
router.put('/update', Authenticate, async (req: RequestWithUser, res) => {
  await req.user.populateTeam(true);

  const { name, description } = req.body;

  if (name) {
    req.user.team.name = name;
  }

  if (description) {
    req.user.team.description = description;
  }

  await req.user.team.save();

  res.json({
    success: true,
    message: 'Successfully updated team',
    team: req.user.team,
  });
});

/**
 * Allows the user to leave the team BUT does not remove the team.
 */
router.post('/leave', Authenticate, async (req: RequestWithUser, res) => {
  await req.user.populateTeam();
  if (req.user.team) {
    req.user.team = null;
    req.user.save();
    res.send({
      user: req.user,
    });
  }
});

/**
 * Invites a user (by email) to the team
 */
router.post('/invite', Authenticate, async (req: RequestWithUser, res) => {
  const { email } = req.body;

  await req.user.populateTeam(true);

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({
      success: false,
      message: `User with email "${email}" does not exist`,
    });
  }

  if (!user.teamInvites.includes(req.user.team._id)) {
    user.teamInvites.push(req.user.team._id);
  }

  user.save();

  return res.json({
    success: true,
    message: `User with email "${email}" invited to team successfully!`,
  });
});

/**
 * Accepts an invitation to a team
 */
router.post('/accept', Authenticate, async (req: RequestWithUser, res) => {
  const { teamId } = req.body;
  // check that there is an acutal invite (in the user);
  const team = await Team.findById(teamId);

  if (team) {
    req.user.teamInvites = [];
    req.user.team = teamId;
    await req.user.save();

    team.users.push({
      user: req.user._id,
      roleIndex: team.roles.length - 1, // Invited users get the lowest role
    });
    await team.save();

    res.send({
      success: true,
      message: 'User added to team',
      team,
      user: req.user,
    });
  } else {
    res.status(404).send('Team not found with id' + teamId);
  }
});

/**
 * Declines an invite to a team
 */
router.post('/decline', Authenticate, async (req: RequestWithUser, res) => {
  const { teamId } = req.body;

  req.user.teamInvites = req.user.teamInvites.filter(
    (invite) => !invite.equals(teamId)
  );
  await req.user.save();
  res.send({
    message: 'Declined team invite',
    user: req.user,
    success: true,
  });
});

/**
 * Removes a user from the team.
 */
router.post('/user/remove', Authenticate, async (req: RequestWithUser, res) => {
  const { userId } = req.body;
  await req.user.populateTeam();

  req.user.team.users = req.user.team.users.filter((teamUser) => {
    return !teamUser.user.equals(userId);
  });

  const userToRemove = await User.findById(userId);
  userToRemove.team = null;
  await userToRemove.save();
  await req.user.team.save();
  await req.user.populateTeam(true);

  res.send({
    message: 'User removed from team!',
    team: req.user.team,
    success: true,
  });
});

/**
 * Updates a users role in the team.
 */
router.post('/user/update', Authenticate, async (req: RequestWithUser, res) => {
  const { userId, roleIndex } = req.body;
  await req.user.populateTeam(true);
  if (req.user.team.roles.length - 1 < roleIndex) {
    return res.status(400).send({ error: 'Role index is not valid' });
  }
  req.user.team.users = req.user.team.users.map((userDoc) => {
    if (userDoc.user.equals(userId)) {
      userDoc.roleIndex = roleIndex;
    }
    return userDoc;
  });
  await req.user.team.save();
  res.json({
    message: 'Users role updated',
    team: req.user.team,
    success: true,
  });
});

/**
 * Update roles, permissions are based off the index of the role to keep it simple.
 */
router.post('/roles', Authenticate, async (req: RequestWithUser, res) => {
  const { roles } = req.body;

  if (!Array.isArray(roles) || !roles.every((i) => typeof i === 'string')) {
    return res.status(400).send('Roles must be of type strings');
  }

  await req.user.populateTeam();

  req.user.team.roles = roles;

  const newRolePerms = roles.map((_, index) => {
    if (typeof req.user.team.rolePermissions[index] !== 'undefined') {
      const roleObj = req.user.team.rolePermissions[index];
      roleObj.roleIndex = index;
      return roleObj;
    }

    return {
      roleIndex: index,
      permissions: [],
    };
  });

  req.user.team.rolePermissions = newRolePerms;

  req.user.team.save();

  res.json({ message: 'updated roles', success: true });
});

/**
 * Update Permissions, currently using role name. Uses indexes for now.
 */
router.post('/permissions', Authenticate, async (req: RequestWithUser, res) => {
  const { roleIndex, permissions } = req.body;

  await req.user.populateTeam(true);

  if (roleIndex < 0 || roleIndex > req.user.team.roles.length - 1) {
    return res
      .status(400)
      .send({ error: 'Role does not exist with that index' });
  }

  req.user.team.roles.forEach((_, index) => {
    if (!req.user.team.rolePermissions[index]) {
      req.user.team.rolePermissions[index] = {
        permissions: [],
        roleIndex: index,
      };
    }

    if (index === roleIndex) {
      req.user.team.rolePermissions[index].permissions = permissions;
    }
  });

  await req.user.team.save();

  res.send({
    team: req.user.team,
    message: 'Updated permissions',
    success: true,
  });
});

export default router;
