function convertToNestedCategories(categories) {
    const categoryMap = new Map();
  
    // Create a map of categories using their IDs as keys
    for (const category of categories) {
      categoryMap.set(category._id.toString(), {
        _id: category._id,
        name: category.name,
        class: category.class,
        children: [],
      });
    }
  
    // Populate the children for each category
    for (const category of categories) {
      if (category.parentId) {
        const parent = categoryMap.get(category.parentId.toString());
        if (parent) {
          parent.children.push(categoryMap.get(category._id.toString()));
        }
      }
    }
  
    // Find the top-level categories (categories without parents)
    const nestedCategories = [];
    for (const category of categories) {
      if (!category.parentId) {
        nestedCategories.push(categoryMap.get(category._id.toString()));
      }
    }

    return nestedCategories;
  }

module.exports = {
    convertToNestedCategories
}