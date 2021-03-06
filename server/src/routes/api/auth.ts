import express from 'express';

import User, { IUser } from './../../models/user.model';
import isValidEmail from '../../utils/isValidEmail';
import containsNumber from '../../utils/containsNumber';
import {
    MIN_PASSWORD_LEN,
    MIN_USER_LEN,
    RES_AUTH_HEADER,
} from '../../constants/auth';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findByCredentials(username, password);

    if (user) {
        const token = await user.createAuthToken();
        await user
            .populate({
                path: 'team',
                populate: {
                    path: 'users',
                    populate: {
                        path: 'user',
                        model: 'User',
                        select: '_id, username, email',
                    },
                },
            })
            .execPopulate();

        return res.send({ token, user });
    }

    res.status(401).send({ error: 'Invalid Login' });
});

router.get('/verify', async (req, res) => {
    const token = req.header(RES_AUTH_HEADER);

    const user: IUser = await User.findByToken(token);

    if (!user) {
        return res.status(200).json({ valid: false });
    }

    await user.populate('teamInvites').execPopulate();

    res.status(200).json({ valid: true, user });
});

router.post('/register', async (req, res) => {
    const { username, email, password, confirm } = req.body;
    const error400WithMsg = (msg: string) =>
        res.status(400).json({ error: msg });

    try {
        const usersWithUsername = await User.find({ username });

        if (usersWithUsername.length) {
            error400WithMsg('User with that username already exists!');
            return;
        }

        if (username.length < MIN_USER_LEN) {
            error400WithMsg(
                `Username must be at least ${MIN_USER_LEN} length!`
            );
            return;
        }

        const usersWithEmail = await User.find({ email });

        if (usersWithEmail.length) {
            error400WithMsg('User with that email already exists!');
            return;
        }

        if (!isValidEmail(email)) {
            error400WithMsg('That email is not valid!');
            return;
        }

        if (!containsNumber(password)) {
            error400WithMsg('Password must contain a number!');
            return;
        }

        if (password.length < MIN_PASSWORD_LEN) {
            error400WithMsg(
                `Password must be at least ${MIN_PASSWORD_LEN} length!`
            );
            return;
        }

        if (password !== confirm) {
            error400WithMsg(`Password and confirmation must match!`);
            return;
        }

        const user = new User({ username, email, password });

        const newUser = await user.save();

        if (newUser) {
            const token = await newUser.createAuthToken();

            res.json({ token, user: newUser, success: true });
        }
    } catch (err) {
        res.status(400).json({
            error: 'Something went wrong trying to register you',
        });
    }
});

export default router;
