import express from 'express';

import usersRouter from './api/users';
import authRouter from './api/auth';
import teamRouter from './api/team';
import projectRouter from './api/project';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/team', teamRouter);
router.use('/project', projectRouter);

export default router;
