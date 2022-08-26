import express from 'express';

import userRouter from './api/user';
import authRouter from './api/auth';
import teamRouter from './api/team';
import projectRouter from './api/project';
import taskRouter from './api/task';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/team', teamRouter);
router.use('/project', projectRouter);
router.use('/task', taskRouter);

export default router;
