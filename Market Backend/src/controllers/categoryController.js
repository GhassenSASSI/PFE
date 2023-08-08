const categoryService = require('../services/categoryService');

// Controller function to add a category
async function addCategory(req, res) {
    const { name, parentId } = req.body;
  
    try {
      const category = await categoryService.addCategory(name, parentId);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

// Controller function to get all categories
async function getAllCategories(req, res) {
    try {
      const categories = await categoryService.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

// Controller function to get all categories
async function getCategories(req, res) {
  try {
    const categories = await categoryService.getCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to delete a category
async function deleteCategory(req, res) {
    const { categoryId } = req.params;
  
    try {
      const category = await categoryService.deleteCategory(categoryId);
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

module.exports = {
    addCategory,
    getAllCategories,
    getCategories,
    deleteCategory
}