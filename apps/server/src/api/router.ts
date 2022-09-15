import express from 'express';

import userRouter from './v1/user/router';
import authRouter from './v1/auth/router';
import teamRouter from './v1/team/router';
import projectRouter from './v1/project/router';
import taskRouter from './v1/task/router';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/team', teamRouter);
router.use('/project', projectRouter);
router.use('/task', taskRouter);

export default router;
