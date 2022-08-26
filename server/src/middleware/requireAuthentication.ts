import { NextFunction, Request, Response } from 'express';

export const requireAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).send({ message: 'Unauthorized' });
};

export default requireAuthentication;
