import express from 'express';
import { z } from 'zod';
// import paramValidator from '../../middleware/paramValidator';

const router = express.Router();

// router.get('/:id', Authenticate, async (req: RequestWithUser, res) => {
//   try {
//     const task = await TaskService.findOne(req.params.id);
//     res.send({ task });
//   } catch (err) {
//     res.send({ task: null });
//   }
// });

// router.post('/', Authenticate, async (req: RequestWithUser, res) => {
//   const {
//     title,
//     description,
//     estimatedHours,
//     status,
//     assignee,
//     project,
//   } = req.body;

//   try {
//     const task = TaskService.create({
//       title,
//       description,
//       estimatedHours,
//       status,
//       assignee,
//       project,
//       userId: req.user._id,
//     });
//     res.send({ task });
//   } catch (error) {
//     res.status(500).send('Something went wrong');
//   }
// });

// router.put('/:id', Authenticate, async (req: RequestWithUser, res) => {
//   const { title, description, assignee, status, estimatedHours } = req.body;

//   try {
//     const task = await TaskService.update({
//       title,
//       description,
//       assignee,
//       status,
//       estimatedHours,
//       _id: req.params.id,
//     });
//     res.send({ task });
//   } catch (err) {
//     res.send({ task: null });
//   }
// });

// router.delete('/:id', Authenticate, async (req: RequestWithUser, res) => {
//   try {
//     await TaskService.deleteOne(req.params.id, req.user.id);
//     res.send({ message: 'Task deleted!' });
//   } catch (err) {
//     return res.send(400).send({ error: 'Something went wrong' });
//   }
// });

export default router;
