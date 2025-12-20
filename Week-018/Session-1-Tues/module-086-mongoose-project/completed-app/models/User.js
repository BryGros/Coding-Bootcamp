// User Model
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true
  },
  address: {
    type: String,
    maxlength: [200, 'Address cannot exceed 200 characters'],
    default: ''
  }
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt
});

// Create and export the model
const User = mongoose.model('User', userSchema);

module.exports = User;
