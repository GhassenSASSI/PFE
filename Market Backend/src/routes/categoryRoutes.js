const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

// Route for adding a new category
router.post('/categories', categoryController.addCategory);

// Route for getting all categories
router.get('/categories', categoryController.getAllCategories);

// Route for deleting a category
router.delete('/categories/:categoryId', categoryController.deleteCategory);

module.exports = router;