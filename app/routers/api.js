const express = require('express');
const passport = require('passport');
const usersController = require('../controllers/UsersController');
const router = express.Router();

// Users
// Get all users
router.get('/api/users', usersController.index);
// Create a new user
router.post('/api/users', usersController.store);
// Sign Up a new user
router.post(
    '/api/signup',
    passport.authenticate('signup', { session: false }),
    ((req, res, next) => {
        res.send(req.user);
    })
);
// Login
router.post(
    '/api/login',
    passport.authenticate('login',{ session: false }),
    ((req, res, next) => {
        res.send('Login success');
    })
);

module.exports = router;
