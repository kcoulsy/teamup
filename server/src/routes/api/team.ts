import express from 'express';
import Team from '../../models/team.model';
import Authenticate from '../../middleware/authenticate';
// import User from '../../models/user.model';
// import RequireTeamPermission from './../../middleware/requireTeamPermission';

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
    //TODO: prevent creating a team if one already exists.
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
    // const found = await User.findOne({ _id: req.user.id }).populate('Team');
    // await req.user.populate('team').execPopulate();
    res.send({ team: team });
});

/**
 * Invites a user (by email) to the team
 */
router.post('/invite', async (req, res) => {
    const { email } = req.body;

    await req.user.populate('team').execPopulate();
    res.send(`${email} invited to team ${req.user.team._id}`);
});

/**
 * Accepts an invitation to a team
 */
router.post('/accept', async (req, res) => {
    const { teamId } = req.body;

    const team = await Team.findById(teamId);

    if (team) {
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
 * Update roles
 */
router.post('/roles', async (req, res) => {
    await req.user.populate('team').execPopulate();
    res.send('updated roles');
});

/**
 * Update Permissions
 */
router.post('/permissions', async (req, res) => {
    await req.user.populate('team').execPopulate();
    res.send('updated permissions');
});

export default router;
