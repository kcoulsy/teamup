import express from 'express';

import usersRouter from './api/users';
import authRouter from './api/auth';
import teamRouter from './api/team';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/team', teamRouter);

export default router;
