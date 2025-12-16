// Product Model
const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    minlength: [3, 'Product name must be at least 3 characters'],
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    minlength: [10, 'Description must be at least 10 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'],
      message: '{VALUE} is not a valid category'
    }
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt
});

// Create and export the model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
