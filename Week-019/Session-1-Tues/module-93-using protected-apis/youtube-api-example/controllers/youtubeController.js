// YouTube API configuration
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3'

// GET /search - Search YouTube videos
async function searchVideos(req, res) {
  try {
    // Get search query from URL parameters
    const searchQuery = req.query.q || 'javascript tutorial'
    const maxResults = parseInt(req.query.maxResults) || 10

    // Validate maxResults
    if (maxResults < 1 || maxResults > 50) {
      return res.status(400).json({
        error: 'maxResults must be between 1 and 50'
      })
    }

    console.log(`Searching YouTube for: "${searchQuery}" (max ${maxResults} results)`)

    // Build YouTube API URL
    const youtubeUrl = `${YOUTUBE_API_BASE_URL}/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`

    // Make request to YouTube API
    const response = await fetch(youtubeUrl)

    // Handle authentication errors
    if (response.status === 401) {
      console.error('401 Unauthorized - Invalid API key')
      return res.status(401).json({
        error: 'Invalid API key',
        message: 'Check your YOUTUBE_API_KEY in .env file'
      })
    }

    // Handle quota errors
    if (response.status === 403) {
      console.error('403 Forbidden - Quota exceeded or API not enabled')
      return res.status(403).json({
        error: 'Quota exceeded or API not enabled',
        message: 'Check your Google Cloud Console quotas and make sure YouTube Data API v3 is enabled'
      })
    }

    // Handle other errors
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status} ${response.statusText}`)
    }

    // Parse response
    const data = await response.json()

    // Check if we got results
    if (!data.items || data.items.length === 0) {
      return res.json({
        query: searchQuery,
        totalResults: 0,
        videos: [],
        message: 'No videos found for this search query'
      })
    }

    // Format response with only title, description and link
    const formattedResponse = {
      query: searchQuery,
      totalResults: data.items.length,
      videos: data.items.map(item => ({
        title: item.snippet.title,
        description: item.snippet.description,
        link: `https://www.youtube.com/watch?v=${item.id.videoId}`
      }))
    }

    // Send formatted response
    res.json(formattedResponse)

  } catch (error) {
    console.error('Error searching YouTube:', error.message)
    res.status(500).json({
      error: 'Failed to search YouTube',
      message: error.message
    })
  }
}

// GET /video/:id - Get details for a specific video
async function getVideoById(req, res) {
  try {
    const videoId = req.params.id

    console.log(`Getting details for video: ${videoId}`)

    // Build YouTube API URL for video details
    const youtubeUrl = `${YOUTUBE_API_BASE_URL}/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`

    const response = await fetch(youtubeUrl)

    if (response.status === 401) {
      return res.status(401).json({ error: 'Invalid API key' })
    }

    if (response.status === 403) {
      return res.status(403).json({ error: 'Quota exceeded' })
    }

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.items || data.items.length === 0) {
      return res.status(404).json({ error: 'Video not found' })
    }

    const video = data.items[0]

    // Format response with only essential data
    res.json({
      title: video.snippet.title,
      description: video.snippet.description,
      link: `https://www.youtube.com/watch?v=${video.id}`
    })

  } catch (error) {
    console.error('Error getting video details:', error.message)
    res.status(500).json({
      error: 'Failed to get video details',
      message: error.message
    })
  }
}

module.exports = {
  searchVideos,
  getVideoById
}
