const express = require('express');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const { authenticateToken } = require('../utils/authUtils');

const router = express.Router();

// Route for adding a new product
router.post('/products/:productId', authenticateToken, cartController.addProduct);

// Route for getting all products in the cart
router.get('/products', authenticateToken, cartController.getProducts);

// Route for updating a product quantity
router.put('/products/:productId', authenticateToken, cartController.updateProductQuantity);

// Route for increasing a product quantity
router.put('/products/increase/:productId', authenticateToken, cartController.increaseProductQuantity);

// Route for decreasing a product quantity
router.put('/products/decrease/:productId', authenticateToken, cartController.decreaseProductQuantity);

// Route for deleting a product
router.delete('/products/:productId', authenticateToken, cartController.deleteProduct);

// Route for deleting all products
router.delete('/products', authenticateToken, cartController.deleteAllProducts);

// Route for placing a new order
router.post('/order/:cartId', authenticateToken, orderController.placeOrder);

/*// Route for ordering
router.post('/products', authenticateToken, cartController.orderProducts);*/

module.exports = router;