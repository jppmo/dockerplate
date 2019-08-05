const userService = require('../services/user.service');
const express = require('express');

const router = express.Router();

router.get('/:id', function (req, res) {
    const userId = req.params.id;
    userService.getUserById(userId).then(user => res.json(user));
});

router.get('/', function (req, res) {
    userService.getAllUsers().then(users => res.json(users));
});




module.exports = router;