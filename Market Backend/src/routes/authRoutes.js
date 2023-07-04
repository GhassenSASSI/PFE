const express = require('express');
const authController = require('../controllers/authController');
const { authenticateToken } = require('../utils/authUtils');

const router = express.Router();

// Registration route
router.post('/register', authController.register);

// Login route
router.post('/login',authController.login);

// Protected route
router.get('/profile', authenticateToken, (req, res) => {
  const { userId } = req.user;

  // Perform any necessary operations with the authenticated user

  res.json({ message: `User profile for user ID: ${userId}` });
});

// Logout route
router.get('/logout', authenticateToken, authController.logout);

// Route to get token
router.get('/token', authenticateToken, authController.getToken);

// Route to get authenticated user
router.get('/user', authenticateToken, authController.getUser);

module.exports = router;