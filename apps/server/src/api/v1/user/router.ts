import express from 'express';
import requireAuthentication from '../../../middleware/requireAuthentication';

const router = express.Router();

router.get('/', requireAuthentication, async (req, res) => {
  const user = req.user;
  res.send({ user });
});

export default router;
