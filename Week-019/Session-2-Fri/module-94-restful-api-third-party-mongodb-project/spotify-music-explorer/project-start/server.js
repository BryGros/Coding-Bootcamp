// server.js
// Main server file for Spotify Music Explorer API
// This file sets up the Express server, connects to MongoDB, and defines API routes

// TODO: Import required packages (express, mongoose, dotenv, cors)
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDatabase = require("./config/database");

// TODO: Load environment variables from .env file

// TODO: Create Express app instance
const app = express();
const PORT = process.env.PORT || 3000;
// TODO: Apply middleware (cors, express.json)
app.use(cors());
app.use(express.json());
// TODO: Connect to MongoDB using connection string from .env
connectDatabase();
// TODO: Import route files (favorites, search)
const favoritesRouter = require("./routes/favorites");
// TODO: Use route files with appropriate base paths
app.use("/api/favorites", favoritesRouter);
// Example: app.use('/api/favorites', favoritesRouter);
// Example: app.use('/api/search', searchRouter);

// TODO: Create a simple root route for testing
// GET / should return a welcome message
app.get("/", (req, res) => {
  res.json({
    title: "Spotify Favorites API",
    version: "1.0.0",
    endpoints: {
      "GET /api/search?q=query": "Find a song",
      "GET /api/favorites": "See your Favorite Songs",
      "POST /api/favorites": "Add a song to favorites",
      "DELETE /api/favorites/:id": "Remove a specific song from your favorites",
    },
    documentation: {},
  });
});
// TODO: Start the server on PORT from .env (default to 3000)
app.listen(PORT, () => {
  // Log a message when server is running
  console.log(`Server running on http://localhost:${PORT}`);
});
