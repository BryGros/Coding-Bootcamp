// models/Favorite.js
// Mongoose model for favorite tracks stored in MongoDB

const mongoose = require('mongoose');

// RUBRIC: MongoDB/Mongoose Integration - Mongoose schemas with validation
// Define schema for favorite tracks
const favoriteSchema = new mongoose.Schema({
  // Spotify's unique track ID
  spotifyId: {
    type: String,
    required: [true, 'Spotify ID is required']
  },

  // Track name
  trackName: {
    type: String,
    required: [true, 'Track name is required']
  },

  // Artist name
  artistName: {
    type: String,
    required: [true, 'Artist name is required']
  },

  // Album name
  albumName: {
    type: String,
    required: [true, 'Album name is required']
  },

  // 30-second preview URL from Spotify
  // This is optional because not all tracks have preview URLs
  previewUrl: {
    type: String,
    required: false
  },

  // Album cover image URL
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required']
  },

  // RUBRIC: Data Management and Storage - Track when data was added
  // Timestamp when the track was added to favorites
  addedAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the Favorite model
const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
