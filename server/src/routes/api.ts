import express from 'express';

import usersRouter from './api/users';
import authRouter from './api/auth';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/auth', authRouter);

export default router;