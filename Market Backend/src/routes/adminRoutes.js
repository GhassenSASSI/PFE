const express = require('express');
const { authenticateToken } = require('../utils/authUtils');
const adminController = require('../controllers/adminController');

router = express.Router();

// Route for getting all users
router.get('/users', authenticateToken, adminController.getUsers);

module.exports = router;