const express = require('express')
const router = express.Router()
const youtubeController = require('../controllers/youtubeController')

// GET /search - Search YouTube videos
router.get('/search', youtubeController.searchVideos)

// GET /video/:id - Get details for a specific video
router.get('/video/:id', youtubeController.getVideoById)

module.exports = router
