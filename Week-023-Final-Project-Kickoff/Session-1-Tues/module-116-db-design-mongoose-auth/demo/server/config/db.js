// Database configuration with connection pooling and error handling

const mongoose = require('mongoose');

// This function connects to MongoDB with optimized settings
const connectDatabase = async () => {
  try {
    // Get the MongoDB connection string from environment variables
    const mongodbUri = process.env.MONGODB_URI;

    // Make sure the connection string exists
    if (!mongodbUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // Configure connection options for optimal performance
    const connectionOptions = {
      // Use the new URL parser to avoid deprecation warnings
      useNewUrlParser: true,
      // Use the new topology engine for better connection management
      useUnifiedTopology: true,
      // Maximum number of connections in the connection pool
      // This helps handle multiple requests efficiently
      maxPoolSize: 10,
      // Minimum number of connections to keep open
      minPoolSize: 2,
      // How long to wait before timing out a connection attempt (30 seconds)
      serverSelectionTimeoutMS: 30000,
      // How long to wait for a socket connection (45 seconds)
      socketTimeoutMS: 45000,
      // Keep trying to reconnect if connection is lost
      retryWrites: true,
    };

    // Connect to MongoDB with the options
    const connection = await mongoose.connect(mongodbUri, connectionOptions);

    // Log success message with host information
    console.log(`MongoDB Connected: ${connection.connection.host}`);
    console.log(`Database Name: ${connection.connection.name}`);
    console.log(`Connection Pool Size: ${connectionOptions.maxPoolSize}`);

    // Listen for connection events to monitor database health
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (error) => {
      console.error('Mongoose connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected from MongoDB');
    });

    // Return the connection for use in other parts of the app
    return connection;

  } catch (error) {
    // Log detailed error information
    console.error('Error connecting to MongoDB:', error.message);

    // Exit the application if we cannot connect to the database
    // This prevents the app from running without database access
    process.exit(1);
  }
};

// Handle application shutdown gracefully
// This ensures we close the database connection properly
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to application termination');
    process.exit(0);
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    process.exit(1);
  }
});

module.exports = connectDatabase;
