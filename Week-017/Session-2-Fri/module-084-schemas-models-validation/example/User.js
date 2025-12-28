// User Model
// This file defines the User schema and exports the model

const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  age: {
    type: Number,
    min: [13, 'Must be at least 13 years old'],
    max: [120, 'Please enter a valid age']
  }
}, {
  timestamps: true  // Automatically add createdAt and updatedAt
});

// Create the model from the schema
const User = mongoose.model('User', userSchema);

// Export the model so other files can use it
module.exports = User;
