// Database Connection Module
require('dotenv').config();
const mongoose = require('mongoose');

function connectDatabase() {
  // Connect to MongoDB using environment variable
  mongoose.connect(process.env.MONGODB_URI);

  const database = mongoose.connection;

  // Handle connection errors
  database.on('error', (error) => {
    console.error('MongoDB connection error:', error.message);
    console.error('Make sure MongoDB is running and the connection string is correct');
  });

  // Handle successful connection
  database.once('open', () => {
    console.log('Connected to MongoDB successfully!');
    console.log('Database:', database.name);
  });

  // Handle disconnection
  database.on('disconnected', () => {
    console.log('MongoDB disconnected');
  });
}

module.exports = connectDatabase;
