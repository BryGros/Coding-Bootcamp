const mongoose = require('mongoose');

// Define the schema for storing motivational quotes
const quoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    default: 'motivation'
  }
}, {
  timestamps: true
});

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;
