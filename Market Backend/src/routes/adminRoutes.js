const express = require('express');
const { authenticateToken } = require('../utils/authUtils');
const adminController = require('../controllers/adminController');

router = express.Router();

// Route for getting all users
router.get('/users', authenticateToken, adminController.getUsers);

// Route for deleting a user
router.delete('/users/:clientId', authenticateToken, adminController.deleteUser);

// Route for deleting all users
router.delete('/users', authenticateToken, adminController.deleteAllUsers);

module.exports = router;