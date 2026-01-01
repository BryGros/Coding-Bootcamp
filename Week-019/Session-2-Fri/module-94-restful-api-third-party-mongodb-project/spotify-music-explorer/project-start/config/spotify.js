// config/spotify.js
// Spotify API integration and authentication

// NOTE: We're using native fetch (built into Node.js 18+) - no axios needed!

// Spotify API credentials from environment variables
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;


// TODO: Create a function called getAccessToken that:
// 1. Makes a POST request to https://accounts.spotify.com/api/token using fetch
// 2. Sends 'grant_type=client_credentials' in the body
// 3. Includes Basic authentication header with base64 encoded clientId:clientSecret
// 4. Returns the access_token from the response
// 5. Handles errors and logs them

// HINT: Use Buffer.from(clientId + ':' + clientSecret).toString('base64') for encoding
// HINT: The body should be 'grant_type=client_credentials' as a string
// HINT: Set header 'Content-Type' to 'application/x-www-form-urlencoded'
// HINT: Use response.ok to check for errors, then await response.json()


// TODO: Create a function called searchTracks that:
// 1. Accepts a search query string as parameter
// 2. Calls getAccessToken() to get authentication token
// 3. Makes a GET request to https://api.spotify.com/v1/search using fetch
// 4. Builds URL with query parameters: q=query, type=track, limit=10
// 5. Includes Authorization header with Bearer token
// 6. Transforms the response to return simplified track data
// 7. Returns an array of track objects with: id, name, artist, album, preview_url, image
// 8. Handles errors appropriately (especially rate limiting - status 429)

// HINT: Use new URL() and searchParams.append() to build the URL with parameters
// HINT: Check response.status === 429 for rate limiting
// HINT: The tracks are in response.data.tracks.items


// TODO: Export both functions
// module.exports = { getAccessToken, searchTracks };
