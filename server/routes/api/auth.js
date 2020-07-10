const express = require('express');
const router = express.Router();

let User = require('../../models/user.model');

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    User.findByCredentials(username, password)
        .then(user => {
            user.createAuthToken().then(token => res.json({token}));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    // TODO: validate here

    const user = new User({ username, password });

    user.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;