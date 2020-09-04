import { Request, Response, NextFunction } from 'express';
import Authenticate from './authenticate';

const RequireTeamPermission = (permission: string) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Authenticate(req, res, async () => {
        if (!req.user) {
            res.status(401).send();
            return;
        }
        try {
            await req.user.populate('team').execPopulate();

            const team = req.user.team;
            const userRole = team.users.find((user) =>
                req.user._id.equals(user.user)
            ).role;
            const rolePerms = req.user.team.rolePermissions.find(
                (rolePerm) => rolePerm.role === userRole
            );

            if (rolePerms.permissions.includes(permission)) {
                next();
            } else {
                res.status(401).send(
                    'User does not have the team permission: ' + permission
                );
            }
        } catch (err) {
            // console.log(err);
        }
    });
};

export default RequireTeamPermission;
