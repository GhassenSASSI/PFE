const orderService = require('../services/orderService');

// Controller function to place a new order
async function placeOrder(req, res) {
    const { cartId } = req.params;
  
    try {
      const order = await orderService.placeOrder(cartId);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

// Controller function to get all orders
async function getOrders(req, res) {
  try {
    const orders = await orderService.getOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
    placeOrder,
    getOrders
}