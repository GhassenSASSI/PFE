const express = require('express');
const categoryController = require('../controllers/categoryController');
const { authenticateToken } = require('../utils/authUtils');

const router = express.Router();

// Route for adding a new category
router.post('/categories', authenticateToken, categoryController.addCategory);

// Route for getting all categories
router.get('/categories', categoryController.getAllCategories);

// Route for deleting a category
router.delete('/categories/:categoryId', authenticateToken, categoryController.deleteCategory);

module.exports = router;