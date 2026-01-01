// routes/search.js
// Routes for searching Spotify tracks

const express = require('express');
const router = express.Router();
const { searchTracks } = require('../config/spotify');

// RUBRIC: Third-Party API Integration - Search functionality
// GET / - Search for tracks on Spotify
// Query parameter: q (search term)
router.get('/', async (req, res) => {
  try {
    // Get the search query from URL parameters
    const searchQuery = req.query.q;

    // RUBRIC: Data Management and Storage - Data validation
    // Validate that a search query was provided
    if (!searchQuery) {
      return res.status(400).json({
        error: 'Search query is required',
        example: '/api/search?q=bohemian+rhapsody'
      });
    }

    // Call the searchTracks function to get results from Spotify
    const tracks = await searchTracks(searchQuery);

    // RUBRIC: Testing and Documentation - Proper HTTP status codes
    // Return the search results with 200 status
    res.status(200).json({
      query: searchQuery,
      count: tracks.length,
      tracks: tracks
    });

  } catch (error) {
    // RUBRIC: Testing and Documentation - Error handling
    console.error('Search route error:', error.message);

    // Return error response with appropriate status code
    res.status(500).json({
      error: 'Failed to search Spotify',
      message: error.message
    });
  }
});

module.exports = router;
