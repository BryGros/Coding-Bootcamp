require('dotenv').config()
const express = require('express')
const youtubeRoutes = require('./routes/youtubeRoutes')

const app = express()
const PORT = process.env.PORT || 3000

// Check if API key exists on startup
if (!process.env.YOUTUBE_API_KEY) {
  console.error('\n========================================')
  console.error('ERROR: YOUTUBE_API_KEY is not set!')
  console.error('========================================')
  console.error('1. Create a .env file in this directory')
  console.error('2. Add: YOUTUBE_API_KEY=your-api-key-here')
  console.error('3. See Readme.md')
  console.error('========================================\n')
  process.exit(1)
}

// Root endpoint with API information
app.get('/', (req, res) => {
  res.json({
    message: 'YouTube Search API',
    endpoints: {
      'GET /search?q=query': 'Search YouTube videos',
      'GET /video/:id': 'Get video by ID'
    },
    examples: [
      '/search?q=javascript',
      '/video/dQw4w9WgXcQ'
    ]
  })
})

// Use YouTube routes
app.use('/', youtubeRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`\nYouTube API Server running on http://localhost:${PORT}`)
  console.log(`\nExamples:`)
  console.log(`  http://localhost:${PORT}/search?q=nodejs`)
  console.log(`  http://localhost:${PORT}/video/dQw4w9WgXcQ\n`)
})
