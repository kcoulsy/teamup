import express from 'express';
import Project from '../../models/project.model';
import Authenticate from './../../middleware/authenticate';

const router = express.Router();

router.get('/', Authenticate, async (req, res) => {
    // TODO pass in param for team specific tasks
    const projects = await Project.find({ user: req.user._id });
    res.send({ message: 'Getting all projects', projects });
});

router.get('/:id', Authenticate, async (req, res) => {
    const query: any = { user: req.user._id, _id: req.params.id }; //TODO fix this any

    // TODO pass in param for team specific tasks
    const projects = await Project.find(query);
    res.send({ message: 'Getting specific project', projects });
});

router.post('/', Authenticate, async (req, res) => {
    const { title, description } = req.body;

    // TODO check if in a team, AND has perms
    const project = new Project({ title, description, user: req.user._id });
    await project.save();
    res.send({ message: 'Creating a project', project });
});

router.put('/', Authenticate, async (req, res) => {
    const { title, description, projectId } = req.body;

    const project = await Project.findById(projectId);

    if (!project.user.equals(req.user._id)) {
        // OR if no team permissions if it is a team project
        return res.status(401).send({ error: 'This is not your project' });
    }

    if (title) {
        project.title = title;
    }

    if (description) {
        project.description = description;
    }

    await project.save();

    res.send({ message: 'Updating a team', project });
});

router.delete('/', Authenticate, async (req, res) => {
    const { projectId } = req.body;

    const project = await Project.findById(projectId);

    if (!project.user.equals(req.user._id)) {
        // OR if no team permissions if it is a team project
        return res.status(401).send({ error: 'This is not your project' });
    }
    const removed = await Project.deleteOne({ _id: projectId });

    if (removed) {
        res.send({ message: 'Deleted a team' });
    }
});

export default router;
