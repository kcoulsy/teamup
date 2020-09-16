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
router.put('/:id', Authenticate, async (req, res) => {
    const { title, description, assignee, status, estimatedHours } = req.body;

    if (status && !Object.values(TaskStatus).includes(status)) {
        return res.status(400).send({
            error: `Status must be one of the following: ${Object.values(
                TaskStatus
            ).join(' ')}`,
        });
    }

    try {
        const task = await Task.findOne({ _id: req.params.id });
        if (title) {
            task.title = title;
        }
        if (description) {
            task.description = description;
        }
        if (assignee) {
            //TODO validate is a valid assignee
            task.assignee = assignee;
        }
        if (estimatedHours) {
            task.estimatedHours = estimatedHours;
        }
        if (status) {
            task.status = status;
        }
        await task.save();

        res.send({ task });
    } catch (err) {
        res.send({ task: null });
    }
});

/**
 * DELETE a task
 */
router.delete('/:id', Authenticate, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id });
        if (!task.createdBy.equals(req.user._id)) {
            return res.status(401).send({ error: 'Not your task!' });
        }

        task.deleteOne((err) => {
            if (err) {
                return res.send(400).send({ error: 'Something went wrong' });
            }
            res.send({ message: 'Task deleted!' });
        });
    } catch (err) {
        console.log(err);
        return res.send(400).send({ error: 'Something went wrong' });
    }
});

export default router;
