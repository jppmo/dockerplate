const userService = require('../services/user.service');
const express = require('express');
const path = require('path') 

const router = express.Router();


// register route
router.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/register.html'));
});

// register route
router.post('/register', function (req, res, next) {
    const { name, password } = req.body;
    userService.createUser({ name, password }).then(user =>
        res.json({ user, msg: 'account created successfully' })
    );
});

// register route
router.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});



module.exports = router;