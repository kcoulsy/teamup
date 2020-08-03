const express = require('express');
const router = express.Router();

const usersRouter = require('./api/users');
const authRouter = require('./api/auth');

router.use('/users', usersRouter);
router.use('/auth', authRouter);

module.exports = router;
