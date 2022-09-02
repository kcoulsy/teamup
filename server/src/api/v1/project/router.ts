import express, { NextFunction, Request, Response } from 'express';
import { validateRequest } from 'zod-express-middleware';
import requireAuthentication from '../../../middleware/requireAuthentication';
import { createProject, findProjects } from '../../../services/project.service';
import { UnauthorizedError } from '../../../utils/error';
import {
  createProjectBodySchema,
  CreateProjectBodySchemaType,
  GetProjectsQuery,
  getProjectsQuerySchema,
} from './validation';
// import Project from '../../models/project.model';
// import Authenticate from './../../middleware/authenticate';
// import {
//   PERM_ADD_TASK,
//   PERM_EDIT_TEAM_PROJECT,
//   PERM_REMOVE_TEAM_PROJECT,
// } from './../../constants/permissions';
// import { RequestWithUser } from '../../types/express';

const router = express.Router();

router.get(
  '/',
  validateRequest({
    query: getProjectsQuerySchema,
  }),
  requireAuthentication,
  async (
    req: Request<{}, {}, {}, GetProjectsQuery>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) throw new UnauthorizedError();

      const projects = await findProjects({
        userId: req.user.id,
        teamId: req.query.teamId,
      });

      res.send({ projects });
    } catch (error) {
      next(error);
    }
    // const isTeam = req.query.team;
    // const query: any = {};
    // if (isTeam && !req.user.team) {
    //   return res.status(404).send({ error: 'No team found' });
    // }

    // if (isTeam) {
    //   query.team = req.user.team._id;
    // } else {
    //   query.user = req.user._id;
    // }

    // const projects = await Project.find(query).populate('tasks');
    // const estimatedCompletions: any = {};

    // projects.forEach(async (project) => {
    //   estimatedCompletions[project._id] = { totalTime: 0, complete: 0 };
    //   project.tasks.forEach((task) => {
    //     estimatedCompletions[project._id].totalTime += task.estimatedHours;
    //     if (task.status === 'DONE') {
    //       estimatedCompletions[project._id].complete += task.estimatedHours;
    //     }
    //   });
    // });

    // res.send({
    //   message: 'Getting all projects',
    //   projects,
    //   estimatedCompletions,
    // });
  }
);

// router.get('/:id', Authenticate, async (req: RequestWithUser, res) => {
//   const project = await Project.findOne({ _id: req.params.id });

//   if (project.team && !req.user.team._id.equals(project.team._id)) {
//     return res.status(401).send({
//       error: `This task is not part of your team`,
//     });
//   }
//   await project
//     .populate({ path: 'tasks', populate: { path: 'assignee' } })
//     .execPopulate();
//   res.send({ message: 'Getting specific project', project });
// });

router.post(
  '/',
  validateRequest({ body: createProjectBodySchema }),
  requireAuthentication,
  async (
    req: Request<{}, {}, CreateProjectBodySchemaType>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) throw new UnauthorizedError();
      const { title, description } = req.body;

      const project = await createProject({
        title,
        description,
        userId: req.user.id,
        teamId: req.body.teamId,
      });

      res.send({ project });
    } catch (error) {
      next(error);
    }
  }
);

// router.put('/', Authenticate, async (req: RequestWithUser, res) => {
//   const { title, description, projectId } = req.body;

//   const project = await Project.findById(projectId);

//   if (!project.user.equals(req.user._id)) {
//     if (project.team) {
//       const canUpdateProjects = await req.user.hasTeamPermission(
//         PERM_EDIT_TEAM_PROJECT
//       );
//       if (!canUpdateProjects) {
//         return res.status(401).send({
//           error: `You do not have the permission ${PERM_EDIT_TEAM_PROJECT}`,
//         });
//       }
//     } else {
//       return res.status(401).send({ error: 'This is not your project' });
//     }
//   }

//   if (title) {
//     project.title = title;
//   }

//   if (description) {
//     project.description = description;
//   }

//   await project.save();
//   await project.populate('tasks').execPopulate();

//   res.send({ message: 'Updating a team', project, success: true });
// });

// router.delete('/', Authenticate, async (req: RequestWithUser, res) => {
//   const { projectId } = req.body;

//   const project = await Project.findById(projectId);

//   if (!project.user.equals(req.user._id)) {
//     if (project.team) {
//       const canUpdateProjects = await req.user.hasTeamPermission(
//         PERM_REMOVE_TEAM_PROJECT
//       );
//       if (!canUpdateProjects) {
//         return res.status(401).send({
//           error: `You do not have the permission ${PERM_REMOVE_TEAM_PROJECT}`,
//         });
//       }
//     } else {
//       return res.status(401).send({ error: 'This is not your project' });
//     }
//   }

//   const removed = await Project.deleteOne({ _id: projectId });

//   if (removed) {
//     res.send({ message: 'Deleted a team', success: true });
//   }
// });

export default router;
