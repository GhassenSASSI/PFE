const validator = require('email-validator');
const authService = require('../services/authService');

// Controller function for user registration
async function register(req, res) {
  const { userName, email, password, confirmPassword, isAdmin } = req.body;

  // Validate email address
  if (!validator.validate(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    await authService.register(userName, email, password, confirmPassword, isAdmin);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function for user login
async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await authService.login(email, password);
    res.json({ user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

// Controller function for user logout
async function logout(req, res) {
  try {
    // Extract the user ID from the request or the authenticated user object
    const userId = req.user.userId;

    // Call the logout function in the authService
    await authService.logout(userId);

    // Return a success response
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    // Handle any errors and return an error response
    res.status(500).json({ error: error.message });
  }
}

// Controller function to get token
async function getToken(req, res) {
  const userId = req.user.userId;
  try {
    const token = await authService.getToken(userId);

    res.json(token);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to get the authenticated user
async function getUser(req, res) {
  const userId = req.user.userId;
  try {
    const user = await authService.getUser(userId);

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  register,
  login,
  logout,
  getToken,
  getUser
};