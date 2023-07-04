const mongoose = require('mongoose');
const { validatePhotoFileFormat } = require('../utils/productUtils');


const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: {
        type: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                },
                photo: {
                    type: String,
                    required: true,
                    validate: {
                        validator: validatePhotoFileFormat,
                        message: 'Invalid photo file format'
                    }
                },
                name: {
                    type: String,
                    required: true,
                    maxlength: 30,
                    trim: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                },
                price: {
                    type: Number,
                    required: true
                },
                totle: {
                    type: Number,
                    required: true
                }
            }
        ],
        default: []
    },
    total_items: {
        type: Number,
        default: 0
    }
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;