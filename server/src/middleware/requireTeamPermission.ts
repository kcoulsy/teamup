import { Response, NextFunction } from 'express';
import { RequestWithUser } from '../types/express';
import Authenticate from './authenticate';

const RequireTeamPermission = (permission: string) => (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  Authenticate(req, res, async () => {
    if (!req.user) {
      res.status(401).send();
      return;
    }
    try {
      const hasPermission = await req.user.hasTeamPermission(permission);
      if (hasPermission) {
        next();
      } else {
        res
          .status(401)
          .send('User does not have the team permission: ' + permission);
      }
    } catch (err) {
      res.status(500).send('Something went wrong!');
    }
  });
};

export default RequireTeamPermission;
