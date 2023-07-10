const Cart = require('../models/cart');
const Product = require('../models/product');

// Calculate totle price
function formatNumberWithOneDecimal(value) {
    return parseFloat(value.toFixed(1));
  }

// Service function to add a product
async function addProduct(productId, userId, quantity) {
    try {
        let userCart = await Cart.findOne({userId: userId});

        if (!userCart) {
            userCart = new Cart({userId: userId})
        }

        const product = await Product.findById({_id: productId});

        if (userCart && product) {
            if(userId.toString() === product.userId.toString()) {
                return {
                    success: false,
                    message: 'This product is yours'
                }
            }

            const productExists = userCart.items.find(item => item.productId.toString() === productId.toString());
            let update = false;

            if (productExists) {
                quantity += productExists.quantity;
                update = true;
            }

            if (quantity > product.quantity) {
                return {
                  success: false,
                  message: 'The requested quantity exceeds the available quantity of the product.'
                }
            }
            
            let totle = product.price * quantity;

            const cartItem = {
                productId: product._id,
                photo: product.photo,
                name: product.name,
                quantity: quantity,
                price: product.price,
                totle: totle,
                _id: product.userId
            };
      
            if (!update) {
                userCart.items.push(cartItem);
                userCart.total_items += 1;
            } else {
                const existingProductIndex = userCart.items.findIndex(item => item.productId.toString() === productId);
                if (existingProductIndex !== -1) {
                    userCart.items[existingProductIndex].quantity = quantity;
                    userCart.items[existingProductIndex].totle = totle;
                }
            }

            await userCart.save();
      
            return {
              success: true,
              message: 'Product added to cart successfully.',
              cart: userCart
            };
        } else {
            return {
              success: false,
              message: 'User or product not found.'
            };
        }
    } catch (error) {
        throw new Error(error.message + ' Failed to add product');
    }
}

// Service function to get products
async function getProducts(userId) {
    try {
      const cart = await Cart.findOne({ userId: userId });
      return cart.items;
    } catch (error) {
      throw new Error('Failed to get products');
    }
}

// Service function to update a product
async function updateProductQuantity(productId, quantity, userId) {
    try {
        const cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            throw new Error('Your cart is empty');
        } else {
            const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            const product = await Product.findById({_id: productId});
            if (productIndex === -1 || !product) {
                throw new Error('Product not found');
            } else {
                if (quantity > product.quantity) {
                    throw new Error('The requested quantity exceeds the available quantity of the product.');
                }
                cart.items[productIndex].quantity = quantity;
                cart.items[productIndex].totle = cart.items[productIndex].price * quantity;
                const cartToUpdate = await Cart.findOneAndUpdate(
                    { userId: userId },
                    { $set: { items: cart.items } },
                    { new: true }
                );
                return cartToUpdate.items[productIndex];
            }
        }
    } catch (error) {
        throw new Error(error.message + ' Failed to update product');
    }
}

// Service function to increase a product quantity
async function increaseProductQuantity(productId, userId) {
    try {
        const cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            throw new Error('Your cart is empty');
        } else {
            const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            const product = await Product.findById({_id: productId});
            if (productIndex === -1 || !product) {
                throw new Error('Product not found');
            } else {
                cart.items[productIndex].quantity += 1;
                if (cart.items[productIndex].quantity > product.quantity) {
                    throw new Error('The requested quantity exceeds the available quantity of the product.');
                }
                cart.items[productIndex].totle = cart.items[productIndex].price * cart.items[productIndex].quantity;
                const cartToUpdate = await Cart.findOneAndUpdate(
                    { userId: userId },
                    { $set: { items: cart.items } },
                    { new: true }
                );
                return cartToUpdate.items[productIndex];
            }
        }
    } catch (error) {
        throw new Error(error.message + ' Failed to update product');
    }
}

// Service function to decrease a product quantity
async function decreaseProductQuantity(productId, userId) {
    try {
        const cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            throw new Error('Your cart is empty');
        } else {
            const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            const product = await Product.findById({_id: productId});
            if (productIndex === -1 || !product) {
                throw new Error('Product not found');
            } else {
                cart.items[productIndex].quantity -= 1;
                if (cart.items[productIndex].quantity < 1) {
                    throw new Error('The quantity can not be less than one. If you want to remove this product you can press the Delete button.');
                }
                cart.items[productIndex].totle = cart.items[productIndex].price * cart.items[productIndex].quantity;
                const cartToUpdate = await Cart.findOneAndUpdate(
                    { userId: userId },
                    { $set: { items: cart.items } },
                    { new: true }
                );
                return cartToUpdate.items[productIndex];
            }
        }
    } catch (error) {
        throw new Error(error.message + ' Failed to update product');
    }
}

// Service function to delete a product
async function deleteProduct(productId, userId) {
    try {
      const cart = await Cart.findOne({ userId: userId });
  
      if (!cart) {
        throw new Error('Your cart is empty');
      } else {
        const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (productIndex === -1) {
            throw new Error('Product not found');
        } else {
            if (cart.total_items > 1) {
                const cartToUpdate = await Cart.findOneAndUpdate(
                    { userId: userId },
                    { $pull: { items: { productId: cart.items[productIndex].productId } },
                    $inc: { total_items: -1 } },
                    { new: true }
                );
                return cartToUpdate.items[productIndex];
            } else {
                const cartToDelete = await Cart.findOneAndDelete({ userId: userId });
                return cartToDelete;
            } 
        }
      }
    } catch (error) {
      throw new Error(error.message + ' Failed to delete product');
    }
}

// Service function to delete  all products
async function deleteAllProducts(userId) {
    try {
      const cart = await Cart.findOneAndDelete({ userId: userId });
      if (cart) {
        return cart;
      } else {
        throw new Error('Your cart is already empty');
      }
    } catch (error) {
      throw new Error(error.message + ' Failed to delete products');
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