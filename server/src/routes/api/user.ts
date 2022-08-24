import express from 'express';
import { RES_AUTH_HEADER } from '../../constants/auth';
import { authWithToken } from '../../services/auth.service';
import { RequestWithUser } from '../../types/express';
import Authenticate from './../../middleware/authenticate';

const router = express.Router();

router.get('/', async (req: RequestWithUser, res) => {
  const token = req.header(RES_AUTH_HEADER);
  const user = await authWithToken(token);

  res.send({ user });
});

export default router;
