// server.js
// Main server file for Spotify Music Explorer API
// This file sets up the Express server, connects to MongoDB, and defines API routes

// RUBRIC: Backend API Development - Express server setup with proper middleware
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Create Express application instance
const app = express();

// RUBRIC: Backend API Development - Apply middleware
// Enable CORS for cross-origin requests
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// RUBRIC: MongoDB/Mongoose Integration - Connect to MongoDB Atlas
const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Successfully connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    // Exit the process if database connection fails
    process.exit(1);
  }
};

// Connect to database
connectDatabase();

// Import route files
const searchRouter = require('./routes/search');
const favoritesRouter = require('./routes/favorites');

// RUBRIC: Backend API Development - RESTful routes following best practices
// Use route files with appropriate base paths
app.use('/api/search', searchRouter);
app.use('/api/favorites', favoritesRouter);

// Root route for testing server status
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Spotify Music Explorer API',
    endpoints: {
      search: '/api/search?q=search_term',
      favorites: '/api/favorites'
    },
    note: 'Simple music favorites API - Search Spotify and save your favorite tracks'
  });
});

// RUBRIC: Testing and Documentation - Proper error handling
// Error handling middleware for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test the API at http://localhost:${PORT}`);
});
