// Product Model
// This file defines the Product schema and exports the model

const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: true,
    enum: {
      values: ['electronics', 'clothing', 'food', 'books'],
      message: '{VALUE} is not a valid category'
    }
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create the model
const Product = mongoose.model('Product', productSchema);

// Export the model
module.exports = Product;
