require('../../dotenv-config');

const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Token = require('../models/token');
const { v4: uuidv4 } = require('uuid');
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

// Function to generate JWT token
function generateToken(userId) {
  const uniqueValue = uuidv4();
  return jwt.sign({ userId, uniqueValue }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Function for user registration
async function register(userName, email, password, confirmPassword, isAdmin) {
    try {
      if (password !== confirmPassword) {
        throw new Error('Password and confirmation password do not match');
      }
  
      const user = new User({ userName, email, password, isAdmin });
      await user.save();
    } catch (error) {
      throw new Error('Failed to register user');
    }
  }

// Function for user login
async function login(email, password) {
  try {
    const user = await User.findOne({ email });

    if (!user || !await user.comparePassword(password)) {
      throw new Error('Invalid email or password');
    }

    const token = generateToken(user._id);

    const tokenData = new Token({ userId: user._id, token });
    await tokenData.save();

    return { user, token };
  } catch (error) {
    throw new Error(error);
  }
}

// Function to clear the authentication token for a user
async function clearAuthToken(userId) {
  try {
    const deletedToken = await Token.deleteMany({ userId });

    if (deletedToken.deletedCount === 0) {
      throw new Error('Token not found');
    }

    return 'Token deleted successfully';
  } catch (error) {
    throw new Error('Failed to delete authentication token');
  }
}

// Function for user logout
async function logout(userId) {
  try {
    await clearAuthToken(userId);
    
    return 'Logout successful';
  } catch (error) {
    throw new Error(error);
  }
}

// Service function to get token
async function getToken(userId) {
  try {
    const token = await Token.findOne({ userId: userId });

    if(!token) {
      throw new Error('Token not found');
    }

    return token;
  } catch (error) {
    throw new Error('Failed to get token');
  }
}

// Service function to get the authenticated user
async function getUser(userId) {
  try {
    const user = await User.findOne({ _id: userId });

    if(!user) {
      throw new Error('User not authenticated')
    }

    return user;
  } catch (error) {
    throw new Error(error.message + ' Failed to retreive the user');
  }
}

module.exports = {
  register,
  login,
  logout,
  getToken,
  getUser
};