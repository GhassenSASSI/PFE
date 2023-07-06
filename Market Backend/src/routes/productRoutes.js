const express = require('express');
const productController = require('../controllers/productController');
const { authenticateToken } = require('../utils/authUtils');

const router = express.Router();

// Route for adding a new product
router.post('/products', authenticateToken, productController.addProduct);

// Route for getting all products for a user
router.get('/products', authenticateToken, productController.getProducts);

// Route for updating a product
router.put('/products/:productId', authenticateToken, productController.updateProduct);

// Route for deleting a product
router.delete('/products/:productId', authenticateToken, productController.deleteProduct);

// Route for deleting all products for a user
router.delete('/products', authenticateToken, productController.deleteAllProducts);

// Route for getting all products for all users
router.get('/allProducts', productController.getAllProducts);

// Route for increasing quantity
router.put('/products/increase/:productId', authenticateToken, productController.increaseQuantity);

// Route for decreasing quantity
router.put('/products/decrease/:productId', authenticateToken, productController.decreaseQuantity);

module.exports = router;