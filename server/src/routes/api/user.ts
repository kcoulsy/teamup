import express from 'express';
import Authenticate from './../../middleware/authenticate';

const router = express.Router();

router.get('/', Authenticate, (req, res) => {
    res.send({ user: req.user });
});

export default router;
