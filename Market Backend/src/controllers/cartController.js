const cartService = require('../services/cartService');

// Controller function to add a product
async function addProduct(req, res) {
    const { quantity } = req.body;
    const userId = req.user.userId;
    const { productId } = req.params;
  
    try {
      const product = await cartService.addProduct(productId, userId, quantity);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

// Controller function to get products
async function getProducts(req, res) {
  const userId = req.user.userId;

  try {
    const products = await cartService.getProducts(userId);
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to update a product quantity
async function updateProductQuantity(req, res) {
  const { productId } = req.params;
  const { quantity } = req.body;
  const userId = req.user.userId;

  try {
    const product = await cartService.updateProductQuantity(productId, quantity, userId);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to increase a product quantity
async function increaseProductQuantity(req, res) {
  const { productId } = req.params;
  const userId = req.user.userId;

  try {
    const product = await cartService.increaseProductQuantity(productId, userId);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to decrease a product quantity
async function decreaseProductQuantity(req, res) {
  const { productId } = req.params;
  const userId = req.user.userId;

  try {
    const product = await cartService.decreaseProductQuantity(productId, userId);
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
    const product = await cartService.deleteProduct(productId, userId);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to delete all products
async function deleteAllProducts(req, res) {
  const userId = req.user.userId;

  try {
    const cart = await cartService.deleteAllProducts(userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
    addProduct,
    getProducts,
    updateProductQuantity,
    deleteProduct,
    deleteAllProducts,
    increaseProductQuantity,
    decreaseProductQuantity
}