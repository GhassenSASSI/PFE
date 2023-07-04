const Product = require('../models/product');
const { shuffleArray } = require('../utils/productUtils');

// Service function to add a new product
async function addProduct(photo, name, quantity, description, rate, price, userId) {
  try {
    const product = new Product({ photo, name, quantity, description, rate, price, userId: userId });
    await product.save();
    return product;
  } catch (error) {
    throw new Error('Failed to add product');
  }
}

// Service function to get all products for a user
async function getProducts(userId) {
  try {
    const products = await Product.find({ userId: userId });
    return products;
  } catch (error) {
    throw new Error('Failed to get products');
  }
}

// Service function to update a product
async function updateProduct(productId, description, userId) {
    try {
      const product = await Product.findOneAndUpdate(
        { _id: productId, userId: userId },
        { description },
        { new: true }
      );
  
      if (!product) {
        throw new Error('Product not found');
      }
  
      return product;
    } catch (error) {
      throw new Error('Failed to update product');
    }
}

// Service function to delete a product
async function deleteProduct(productId, userId) {
  try {
    const product = await Product.findOneAndDelete({ _id: productId, userId: userId });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  } catch (error) {
    throw new Error(error.message + ' Failed to delete product');
  }
}

// Service function to delete all products for a user
async function deleteAllProducts(userId) {
  try {
    const result = await Product.deleteMany({ userId: userId });
    return result.deletedCount;
  } catch (error) {
    throw new Error('Failed to delete products');
  }
}

// Service function to get all products for all users randomly
async function getAllProductsRandomOrder() {
  try {
    const products = await Product.find();
    return shuffleArray(products);
  } catch (error) {
    throw new Error('Failed to retrieve products');
  }
}

module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
  getAllProductsRandomOrder
};
