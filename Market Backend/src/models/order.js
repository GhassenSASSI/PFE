const mongoose = require('mongoose');
const { validatePhotoFileFormat } = require('../utils/productUtils');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userName: {
        type: String,
        required: true,
        trim: true
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
        required: true
    },
    total_items: {
        type: Number,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    /*status: {
        type: String,
        enum: ['pending', 'processing', 'completed'],
        default: 'pending'
    },*/
    orderDate: {
        type: String,
        default: function () {
          const formattedDate = formatDate(new Date());
          return formattedDate;
        },
        required: true,
    }
})

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;