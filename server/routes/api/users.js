const express = require('express');
const router = express.Router();

// Unused but left in as an example of using the Auth middleware

// let User = require('../../models/user.model');

// const { Authenticate } = require('../../middleware/authenticate');

// router.route('/').get(Authenticate, (req, res) => {
//     User.find()
//         .then((users) => res.json(users))
//         .catch((err) => res.status(400).json('Error: ' + err));
// });

module.exports = router;
