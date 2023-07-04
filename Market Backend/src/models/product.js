const mongoose = require('mongoose');
const { validatePhotoFileFormat } = require('../utils/productUtils');

const productSchema = new mongoose.Schema({
  photo: {
    type: String,
    required: true,
    /*validate: {
        validator: validatePhotoFileFormat,
        message: 'Invalid photo file format',
    }*/
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
  description: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    min: 0,
    max: 10,
    required: true
  },
  price: {
    type: Number,
    // Round the input value to one decimal place when setting
    get: (value) => (value.toFixed(1)),
    set: (value) => (parseFloat(value.toFixed(1))),
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;