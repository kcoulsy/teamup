import express from 'express';

import User, { IUser } from './../../models/user.model';
import isValidEmail from '../../utils/isValidEmail';
import containsNumber from '../../utils/containsNumber';
import { MIN_PASSWORD_LEN, MIN_USER_LEN, RES_AUTH_HEADER } from '../../constants/auth';

const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    User.findByCredentials(username, password)
        .then((user: IUser) => {
            user.createAuthToken().then((token: string) => res.json({ token }));
        })
        .catch((err: string) => res.status(400).json('Error: ' + err));
});

router.get('/verify', (req, res) => {
    const token = req.header(RES_AUTH_HEADER);

    User.findByToken(token)
        .then((user: IUser) => {
            if (!user) return Promise.reject();

            res.status(200).json({ valid: true });
        })
        // we still want a 200 if this fails
        .catch((err: string) => res.status(200).json({ valid: false }));
});

router.post('/register', async (req, res) => {
    const { username, email, password, confirm } = req.body;
    const error400WithMsg = (msg: string) => res.status(400).json({ error: msg });

    try {
        const usersWithUsername = await User.find({ username });

        if (usersWithUsername.length) {
            error400WithMsg('User with that username already exists!');
            return;
        }

        if (username.length < MIN_USER_LEN) {
            error400WithMsg(`Username must be at least ${MIN_USER_LEN} length!`);
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
            error400WithMsg(`Password must be at least ${MIN_PASSWORD_LEN} length!`);
            return;
        }

        if (password !== confirm) {
            error400WithMsg(`Password and confirmation must match!`);
            return;
        }

        const user = new User({ username, email, password });

        const newUser = await user.save();

        if (newUser) {
            res.json(user);
        }
    } catch (err) {
        res.status(400).json({ error: 'Something went wrong trying to register you' });
    }
});

export default router;
