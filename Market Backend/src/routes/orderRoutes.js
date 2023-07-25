const express = require('express');
const orderController = require('../controllers/orderController');
const { authenticateToken } = require('../utils/authUtils');

const router = express.Router();

// Route for getting all products for all users
router.get('/allOrders', authenticateToken, orderController.getOrders);

module.exports = router;