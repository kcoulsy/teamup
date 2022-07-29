import express from 'express';
import { RequestWithUser } from '../../types/express';
import Authenticate from './../../middleware/authenticate';

const router = express.Router();

router.get('/', Authenticate, (req: RequestWithUser, res) => {
  res.send({ user: req.user });
});

export default router;
