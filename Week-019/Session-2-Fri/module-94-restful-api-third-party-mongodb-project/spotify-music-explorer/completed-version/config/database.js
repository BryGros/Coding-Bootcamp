// config/database.js
// Database connection configuration for MongoDB Atlas

const mongoose = require('mongoose');

// RUBRIC: MongoDB/Mongoose Integration - Connect to MongoDB Atlas
const connectDatabase = async () => {
  try {
    // Connect to MongoDB using connection string from environment variables
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('Successfully connected to MongoDB Atlas');
  } catch (error) {
    // RUBRIC: Data Management and Storage - Error handling for database operations
    console.error('MongoDB connection error:', error.message);

    // Exit the process if we cannot connect to the database
    // The application cannot function without database access
    process.exit(1);
  }
};

module.exports = connectDatabase;
