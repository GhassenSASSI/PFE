const Order = require('../models/order');
const Cart = require('../models/cart');
const User = require('../models/user');
const { getIO } = require('../socketManager');

// Service function to place a new order
async function placeOrder(cartId) {
    try {
      const cart = await Cart.findById({ _id: cartId })
      if (!cart) {
        throw new Error('Cart not found')
      } else {
        const user = await User.findById({ _id: cart.userId })
        const total_amount = cart.items.reduce((accumulator, currentValue) => accumulator + currentValue.totle, 0);
        const order = new Order({ userId: cart.userId, userName: user.userName, items: cart.items, total_items: cart.total_items, total_amount: total_amount });
        await order.save();
        getIO().emit('newOrder', order);
        return order;
      }
    } catch (error) {
      throw new Error(error.message + ' Failed to place order');
    }
}

// Service function to get all oerders
async function getOrders() {
  try {
    const orders = await Order.find();
    return orders;
  } catch (error) {
    throw new Error('Failed to retrieve products');
  }
}

module.exports = {
    placeOrder,
    getOrders
}