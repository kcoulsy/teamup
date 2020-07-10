const express = require('express');
const router = express.Router();

let User = require('../../models/user.model');

const { Authenticate } = require('../../middleware/authenticate');

router.route('/').get(Authenticate, (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    const { username } = req.body;

    const newUser = new User({ username });

    newUser.save()
        .then(user => res.json(user.toJSON()))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {
    const { username } = req.body;

    User.findOne({username})
        .then(user => {
            console.log(user);
            user.createAuthToken().then(token => res.json({token}));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;