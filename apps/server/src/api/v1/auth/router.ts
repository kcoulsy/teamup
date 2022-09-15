import express, { NextFunction, Request, Response } from 'express';
import { createUser } from '../../../services/auth.service';
import passport from 'passport';
import { validateRequest } from 'zod-express-middleware';
import {
  loginBodySchema,
  registerBodySchema,
  RegisterBodySchema,
} from './validation';
import { UnauthorizedError } from '../../../utils/error';

const router = express.Router();

router.post(
  '/login',
  validateRequest({ body: loginBodySchema }),
  passport.authenticate('local'),
  (req: Request, res) => {
    if (!req.user) throw new UnauthorizedError();

    const { password, ...userWithoutPassword } = req.user;

    res.status(200).json({
      message: 'Successfully logged in',
      user: userWithoutPassword,
    });
  }
);

router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      message: 'Successfully logged out',
    });
  });
});

router.post(
  '/register',
  validateRequest({
    body: registerBodySchema,
  }),
  async (
    req: Request<{}, {}, RegisterBodySchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { username, email, password } = req.body;
      const user = await createUser({ username, email, password });

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        const { password, ...userWithoutPassword } = user;
        res.status(200).json({
          message: 'Successfully registered',
          user: userWithoutPassword,
        });
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
