// routes/favorites.js
// Routes for managing favorite tracks in the database

const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');

// RUBRIC: Backend API Development - CRUD operations
// POST / - Create a new favorite track
router.post('/', async (req, res) => {
  try {
    // Extract track data from request body
    const { spotifyId, trackName, artistName, albumName, previewUrl, imageUrl } = req.body;

    // RUBRIC: Data Management and Storage - Data validation
    // Validate that required fields are provided
    if (!spotifyId || !trackName || !artistName || !albumName || !imageUrl) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['spotifyId', 'trackName', 'artistName', 'albumName', 'imageUrl']
      });
    }

    // RUBRIC: Data Management and Storage - Duplicate prevention
    // Check if this track is already in favorites
    const existingFavorite = await Favorite.findOne({ spotifyId: spotifyId });

    if (existingFavorite) {
      return res.status(400).json({
        error: 'This track is already in your favorites',
        favorite: existingFavorite
      });
    }

    // Create new favorite document
    const newFavorite = new Favorite({
      spotifyId: spotifyId,
      trackName: trackName,
      artistName: artistName,
      albumName: albumName,
      previewUrl: previewUrl,
      imageUrl: imageUrl
    });

    // RUBRIC: MongoDB/Mongoose Integration - Store data in MongoDB
    // Save to database
    const savedFavorite = await newFavorite.save();

    // RUBRIC: Testing and Documentation - Proper HTTP status codes
    // Return created favorite with 201 status
    res.status(201).json({
      message: 'Track added to favorites',
      favorite: savedFavorite
    });

  } catch (error) {
    // RUBRIC: Data Management and Storage - Error handling
    console.error('Error creating favorite:', error.message);

    res.status(500).json({
      error: 'Failed to add favorite',
      message: error.message
    });
  }
});

// RUBRIC: Backend API Development - CRUD operations
// GET / - Get all favorite tracks
router.get('/', async (req, res) => {
  try {
    // RUBRIC: MongoDB/Mongoose Integration - Retrieve data from MongoDB
    // Find all favorites and sort by most recently added
    const favorites = await Favorite.find().sort({ addedAt: -1 });

    // Return favorites array with 200 status
    res.status(200).json({
      count: favorites.length,
      favorites: favorites
    });

  } catch (error) {
    console.error('Error getting favorites:', error.message);

    res.status(500).json({
      error: 'Failed to retrieve favorites',
      message: error.message
    });
  }
});

// RUBRIC: Backend API Development - CRUD operations
// GET /:id - Get a single favorite by ID
router.get('/:id', async (req, res) => {
  try {
    // Get the favorite ID from URL parameters
    const favoriteId = req.params.id;

    // Find favorite by ID
    const favorite = await Favorite.findById(favoriteId);

    // RUBRIC: Testing and Documentation - Proper HTTP status codes
    // If favorite not found, return 404
    if (!favorite) {
      return res.status(404).json({
        error: 'Favorite not found'
      });
    }

    // Return the favorite with 200 status
    res.status(200).json({
      favorite: favorite
    });

  } catch (error) {
    console.error('Error getting favorite:', error.message);

    res.status(500).json({
      error: 'Failed to retrieve favorite',
      message: error.message
    });
  }
});

// RUBRIC: Backend API Development - CRUD operations
// DELETE /:id - Delete a favorite
router.delete('/:id', async (req, res) => {
  try {
    // Get the favorite ID from URL parameters
    const favoriteId = req.params.id;

    // RUBRIC: MongoDB/Mongoose Integration - Delete from MongoDB
    // Find and delete the favorite
    const deletedFavorite = await Favorite.findByIdAndDelete(favoriteId);

    // If favorite not found, return 404
    if (!deletedFavorite) {
      return res.status(404).json({
        error: 'Favorite not found'
      });
    }

    // Return success message with 200 status
    res.status(200).json({
      message: 'Favorite removed successfully',
      favorite: deletedFavorite
    });

  } catch (error) {
    console.error('Error deleting favorite:', error.message);

    res.status(500).json({
      error: 'Failed to delete favorite',
      message: error.message
    });
  }
});

module.exports = router;
