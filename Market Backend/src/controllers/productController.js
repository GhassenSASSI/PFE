const productService = require('../services/productService');

// Controller function to add a new product
async function addProduct(req, res) {
  const { photo, name, quantity, description, rate, price } = req.body;
  const userId = req.user.userId;

  try {
    const product = await productService.addProduct(photo, name, quantity, description, rate, price, userId);
    console.log(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.log(req.body);
    res.status(500).json({ error: error.message });
  }
}

// Controller function to get all products for a user
async function getProducts(req, res) {
  const userId = req.user.userId;

  try {
    const products = await productService.getProducts(userId);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to update a product
async function updateProduct(req, res) {
    const { price, description } = req.body;
    const { productId } = req.params;
    const userId = req.user.userId;
  
    try {
      const product = await productService.updateProduct(productId, price, description, userId);
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

// Controller function to delete a product
async function deleteProduct(req, res) {
  const { productId } = req.params;
  const userId = req.user.userId;

  try {
    const product = await productService.deleteProduct(productId, userId);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to delete all products for a user
async function deleteAllProducts(req, res) {
  const userId = req.user.userId;

  try {
    const deletedCount = await productService.deleteAllProducts(userId);
    res.json({ deletedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to get all products for all users
async function getAllProducts(req, res) {
  try {
    const products = await productService.getAllProductsRandomOrder();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to increase quantity
async function increaseQuantity(req, res) {
  const { productId } = req.params;
  const userId = req.user.userId;

  try {
    const product = await productService.increaseQuantity(productId, userId);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to decrease quantity
async function decreaseQuantity(req, res) {
  const { productId } = req.params;
  const userId = req.user.userId;

  try {
    const product = await productService.decreaseQuantity(productId, userId);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
  getAllProducts,
  increaseQuantity,
  decreaseQuantity
};