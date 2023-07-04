const Category = require('../models/category');

// Service function to add category
async function addCategory(name) {
    try {
        const category = new Category({name});
        await category.save();
        return category;
    } catch (error) {
        throw new Error('Failed to add category');
    }
}

// Service function to get all categories
async function getAllCategories() {
    try {
      const categories = await Category.find();
      return categories.sort((a, b) => a.localeCompare(b));
    } catch (error) {
      throw new Error('Failed to get categories');
    }
}
// Service function to delete a category
async function deleteCategory(categoryId) {
    try {
      const category = await Category.findOneAndDelete({ _id: categoryId });
  
      if (!category) {
        throw new Error('category not found');
      }
  
      return category;
    } catch (error) {
      throw new Error('Failed to delete category');
    }
}

module.exports = {
    addCategory,
    getAllCategories,
    deleteCategory
}