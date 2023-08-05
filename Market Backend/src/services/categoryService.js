const Category = require('../models/category');
const { convertToNestedCategories } = require('../utils/categoryUtils');

// Service function to add category
async function addCategory(name, parentId = null) {
  try {
    let newCategory = new Category({ name, class: 'parent' });

    if (parentId) {
      const parentCategory = await Category.findById(parentId);
      if (!parentCategory) {
        throw new Error('Parent category not found.');
      }

      if(parentCategory.class === 'parent') {
        newCategory = new Category({ name, parentId: parentCategory._id, class: 'child1' });
      } else {
        const number = parseInt(parentCategory.class.slice(5)) + 1;
        newCategory = new Category({ name, parentId: parentCategory._id, class: 'child' + number });
      }

      await newCategory.save()
    } else {
      await newCategory.save();
    }

    return newCategory;
  } catch (error) {
    throw new Error('Error adding category: ' + error.message);
  }
}

// Service function to get all categories
async function getAllCategories() {
  try {
    const categories = await Category.find();

    if(categories) {
      return convertToNestedCategories(categories);
    }

    return 'there are no categories found';
    
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