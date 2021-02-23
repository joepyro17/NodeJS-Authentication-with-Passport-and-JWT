const express = require('express');
const router = express.Router();

const usersController = require('../controllers/UsersController');
// Users
// Get all users
router.get('/secured/users', usersController.index);

// Create a new user
router.post('/secured/users', usersController.store);

module.exports = router ;