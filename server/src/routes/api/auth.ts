import express from 'express';
import { RES_AUTH_HEADER } from '../../constants/auth';
import {
  authLogin,
  authWithToken,
  createUser,
} from '../../services/auth.service';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const response = await authLogin(username, password);

    res.send(response);
  } catch (error) {
    res.status(401).send({ error: 'Invalid Login' });
  }
});

router.get('/verify', async (req, res) => {
  const token = req.header(RES_AUTH_HEADER);

  const user = await authWithToken(token);

  if (!user) {
    return res.status(200).json({ valid: false });
  }

  res.status(200).json({ valid: true, user });
});

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const data = await createUser({ username, email, password });

    res.json({ ...data });
  } catch (err) {
    res.status(400).json({
      error: 'Something went wrong trying to register you',
    });
  }
});

export default router;
