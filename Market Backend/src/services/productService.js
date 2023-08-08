const Category = require('../models/category');
const Product = require('../models/product');
const User = require('../models/user');
const { shuffleArray } = require('../utils/productUtils');
const { getIO } = require('../socketManager');

// Service function to add a new product
async function addProduct(photo, name, quantity, description, rate, price, userId) {
  try {
    const product = new Product({ photo, name, quantity, description, rate, price, userId: userId });
    await product.save();
    getIO().emit('newProduct', product);
    return product;
  } catch (error) {
    throw new Error('Failed to add product ' + error.message);
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
async function updateProduct(productId, price, description, userId) {
    try {
      const product = await Product.findOneAndUpdate(
        { _id: productId, userId: userId },
        { price: price, description: description },
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
    const products = await Product.find({ status: true });
    return shuffleArray(products);
  } catch (error) {
    throw new Error('Failed to retrieve products');
  }
}

// Service function to increase quantity
async function increaseQuantity(productId, userId) {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: productId, userId: userId },
      { $inc: { quantity: 1 } },
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

// Service function to decrease quantity
async function decreaseQuantity(productId, userId) {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: productId, userId: userId },
      { $inc: { quantity: -1 } },
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

// Service function to get one product
async function getProductById(productId) {
  try {
    const product = await Product.findById({ _id: productId });
    return product;
  } catch (error) {
    throw new Error('Failed to retrieve the product');
  }
}

// Service function to get not confirmed products
async function getNotConfirmedProducts() {
  try {
    const products = await Product.find({ status: false });

    const userIds = products.map(product => product.userId);

    const users = await User.find({ _id: { $in: userIds } }, 'userName');

    // Map the userName to each product
    const productsWithUserName = products.map(product => {
      const user = users.find(user => user._id.equals(product.userId));
      return { ...product.toObject(), userName: user.userName };
    });

    return productsWithUserName;
  } catch (error) {
    throw new Error('Failed to retrieve products');
  }
}

// Service function to confirm a product
async function confirmProduct(productId, category) {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: productId },
      { category: category, status: true },
      { new: true }
    );

    if(!product) {
      throw new Error('Product not found');
    }

    return product;
  } catch (error) {
    throw new Error('Failed to confirm product ' + error.message);
  }
}

module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
  getAllProductsRandomOrder,
  increaseQuantity,
  decreaseQuantity,
  getProductById,
  getNotConfirmedProducts,
  confirmProduct
};
