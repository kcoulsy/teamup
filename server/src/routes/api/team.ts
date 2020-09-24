import express from 'express';
import Team from '../../models/team.model';
import User from '../../models/user.model';
import Authenticate from '../../middleware/authenticate';
import PERMISSIONS from '../../constants/permissions';

const router = express.Router();

/**
 * Returns the team from the user that made the call.
 */
router.get('/', Authenticate, async (req, res) => {
    await req.user.populate('team').execPopulate();
    await req.user.team
        .populate({
            path: 'users',
            populate: {
                path: 'user',
                model: 'User',
                select: '_id, username, email',
            },
        })
        .execPopulate();

    res.json({ team: req.user.team });
});

/**
 * Creates a team from the user that made the call.
 * Fails if already in a team
 */
router.post('/create', Authenticate, async (req, res) => {
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

    res.send({ team });
});

/**
 * Allows the user to update the team name and description
 */
router.put('/update', Authenticate, async (req, res) => {
    await req.user
        .populate({
            path: 'team',
            populate: {
                path: 'users',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: '_id, username, email',
                },
            },
        })
        .execPopulate();

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
router.post('/leave', Authenticate, async (req, res) => {
    await req.user.populate('team').execPopulate();
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
router.post('/invite', Authenticate, async (req, res) => {
    const { email } = req.body;

    await req.user
        .populate({
            path: 'team',
            populate: {
                path: 'users',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: '_id, username, email',
                },
            },
        })
        .execPopulate();

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
router.post('/accept', Authenticate, async (req, res) => {
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
router.post('/decline', Authenticate, async (req, res) => {
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
router.post('/user/remove', Authenticate, async (req, res) => {
    const { userId } = req.body;
    await req.user
        .populate({
            path: 'team',
            populate: {
                path: 'users',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: '_id, username, email',
                },
            },
        })
        .execPopulate();

    req.user.team.users = req.user.team.users.filter((user) => {
        return !user.user.equals(userId);
    });
    await req.user.team.save();
    res.send({
        message: 'User removed from team!',
        team: req.user.team,
    });
});

/**
 * Updates a users role in the team.
 */
router.post('/user/update', Authenticate, async (req, res) => {
    const { userId, roleIndex } = req.body;
    await req.user
        .populate({
            path: 'team',
            populate: {
                path: 'users',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: '_id, username, email',
                },
            },
        })
        .execPopulate();
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
router.post('/roles', Authenticate, async (req, res) => {
    const { roles } = req.body;
    if (!Array.isArray(roles) || !roles.every((i) => typeof i === 'string')) {
        return res.status(400).send('Roles must be of type strings');
    }

    await req.user.populate('team').execPopulate();

    req.user.team.roles = roles;

    const newRolePerms = roles.map((roleName, index) => {
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
router.post('/permissions', Authenticate, async (req, res) => {
    const { roleIndex, permissions } = req.body;

    await req.user.populate('team').execPopulate();

    if (roleIndex < 0 || roleIndex > req.user.team.roles.length - 1) {
        return res
            .status(400)
            .send({ error: 'Role does not exist with that index' });
    }

    req.user.team.roles.forEach((role, index) => {
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
    // TODO don't really want to keep populating like this...
    await req.user.team
        .populate({
            path: 'users',
            populate: {
                path: 'user',
                model: 'User',
                select: '_id, username, email',
            },
        })
        .execPopulate();

    await req.user.team.save();
    res.send({
        team: req.user.team,
        message: 'Updated permissions',
        success: true,
    });
});

export default router;
