import express from 'express';
import Team from '../../models/team.model';
import User from '../../models/user.model';
import Authenticate from '../../middleware/authenticate';

const router = express.Router();

/**
 * Returns the team from the user that made the call.
 */
router.get('/', Authenticate, async (req, res) => {
    await req.user.populate('team').execPopulate();

    res.send(req.user.team);
});

/**
 * Creates a team from the user that made the call.
 * Fails if already in a team
 */
router.post('/create', Authenticate, async (req, res) => {
    if (req.user.team !== null) {
        return res.send('User already has a team!');
    }

    const team = new Team({
        users: [
            {
                user: req.user._id,
                role: 'Project Manager',
            },
        ],
        roles: ['Project Manager'],
        rolePermissions: [
            {
                role: 'Project Manager',
                permissions: ['team.project.create'],
            },
        ],
    });

    await team.save();

    req.user.team = team._id;
    await req.user.save();

    res.send({ team });
});

/**
 * Invites a user (by email) to the team
 */
router.post('/invite', Authenticate, async (req, res) => {
    const { email } = req.body;

    await req.user.populate('team').execPopulate();

    const user = await User.findOne({ email });

    if (!user.teamInvites.includes(req.user.team._id)) {
        user.teamInvites.push(req.user.team._id);
    }

    user.save();

    res.send(`${email} invited to team ${req.user.team._id}`);
});

/**
 * Accepts an invitation to a team
 */
router.post('/accept', async (req, res) => {
    const { teamId } = req.body;
    // check that there is an acutal invite (in the user);
    const team = await Team.findById(teamId);

    if (team) {
        req.user.teamInvites = [];
        req.user.team = teamId;
        await req.user.save();

        team.users.push({
            user: req.user._id,
            role: team.roles[team.roles.length - 1],
        });
        await team.save();

        res.send({ message: 'user added to team', team, user: req.user });
    } else {
        res.status(404).send('Team not found with id' + teamId);
    }
});

/**
 * Declines an invite to a team
 */
router.post('/decline', async (req, res) => {
    const { teamId } = req.body;

    req.user.teamInvites.filter((invite) => invite !== teamId);
    await req.user.save();
    res.send('Declined team invite');
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
            roleObj.role = roleName;
            return roleObj;
        }

        return {
            role: roleName,
            permissions: [],
        };
    });

    req.user.team.rolePermissions = newRolePerms;

    req.user.team.save();

    res.send('updated roles');
});

/**
 * Update Permissions, currently using role name. Should use some uid
 */
router.post('/permissions', Authenticate, async (req, res) => {
    const { roleName, permissions } = req.body;

    await req.user.populate('team').execPopulate();

    req.user.team.rolePermissions.map((rolePerm) => {
        if (rolePerm.role === roleName) {
            rolePerm.permissions = permissions;
        }
    });

    await req.user.team.save();
    res.send('updated permissions');
});

export default router;
