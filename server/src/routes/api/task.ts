import express from 'express';
import Authenticate from './../../middleware/authenticate';
import Task, { TaskStatus } from '../../models/task.model';
import Project from '../../models/project.model';

const router = express.Router();

/**
 * GET single task
 */
router.get('/:id', Authenticate, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id });
        res.send({ task });
    } catch (err) {
        res.send({ task: null });
    }
});

/**
 * POST create a task
 */
router.post('/', Authenticate, async (req, res) => {
    const {
        title,
        description,
        estimatedHours,
        status,
        assignee,
        project,
    } = req.body;

    if (!Object.values(TaskStatus).includes(status)) {
        return res.status(400).send({
            error: `Status must be one of the following: ${Object.values(
                TaskStatus
            ).join(' ')}`,
        });
    }
    const foundProject = await Project.findById(project);

    if (!foundProject) {
        return res.status(404).send({ error: 'Project not found' });
    }

    const task = new Task({
        title,
        description,
        estimatedHours,
        status,
        assignee,
        project,
        createdBy: req.user._id,
        tasks: [],
    });

    await task.save();

    foundProject.tasks = [...foundProject.tasks, task];
    foundProject.save();

    res.send({ task });
});

/**
 * PUT update a task
 */

/**
 * DELETE a task
 */
export default router;
