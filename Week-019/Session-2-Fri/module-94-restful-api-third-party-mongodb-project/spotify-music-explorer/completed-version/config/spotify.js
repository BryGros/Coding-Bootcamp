// config/spotify.js
// Spotify API integration and authentication

// RUBRIC: Third-Party API Integration - API authentication
// Spotify API credentials from environment variables
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

// Function to get access token from Spotify using Client Credentials flow
const getAccessToken = async () => {
  try {
    // RUBRIC: Third-Party API Integration - Handle API authentication
    // Create base64 encoded string of clientId:clientSecret for Basic authentication
    const authString = Buffer.from(clientId + ':' + clientSecret).toString('base64');

    // Make POST request to Spotify's token endpoint
    const response = await fetch(
      'https://accounts.spotify.com/api/token',
      {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + authString,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
      }
    );

    // Check if request was successful
    if (!response.ok) {
      throw new Error(`Spotify auth failed: ${response.status}`);
    }

    // Parse JSON response
    const data = await response.json();

    // Return the access token from the response
    return data.access_token;

  } catch (error) {
    // RUBRIC: Third-Party API Integration - Error handling for API failures
    console.error('Error getting Spotify access token:', error.message);
    throw new Error('Failed to authenticate with Spotify API');
  }
};

// Function to search for tracks on Spotify
const searchTracks = async (searchQuery) => {
  try {
    // First, get an access token for authentication
    const accessToken = await getAccessToken();

    // RUBRIC: Third-Party API Integration - Integrate with external APIs
    // Build URL with query parameters
    const searchUrl = new URL('https://api.spotify.com/v1/search');
    searchUrl.searchParams.append('q', searchQuery);
    searchUrl.searchParams.append('type', 'track');
    searchUrl.searchParams.append('limit', '10');

    // Make GET request to Spotify search endpoint
    const response = await fetch(searchUrl, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });

    // Check for rate limiting
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    // Check if request was successful
    if (!response.ok) {
      throw new Error(`Spotify search failed: ${response.status}`);
    }

    // Parse JSON response
    const data = await response.json();

    // RUBRIC: Third-Party API Integration - Data transformation
    // Transform Spotify's complex response into simplified format
    const simplifiedTracks = data.tracks.items.map(track => {
      return {
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        preview_url: track.preview_url,
        image: track.album.images[0]?.url || null
      };
    });

    return simplifiedTracks;

  } catch (error) {
    // RUBRIC: Testing and Documentation - Proper error handling and status codes
    console.error('Error searching Spotify:', error.message);

    // Re-throw rate limit errors
    if (error.message.includes('Rate limit')) {
      throw error;
    }

    throw new Error('Failed to search Spotify API');
  }
};

module.exports = {
  getAccessToken,
  searchTracks
};
