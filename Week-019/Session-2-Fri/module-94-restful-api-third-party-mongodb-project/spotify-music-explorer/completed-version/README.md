# Spotify Music Explorer API - Completed Version

A RESTful API that integrates with the Spotify API to search for music, save favorite tracks, and create custom playlists. This is the completed reference implementation.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Get Spotify API Credentials
1. Go to https://developer.spotify.com/dashboard
2. Log in with your Spotify account
3. Click "Create an App"
4. Fill in app name and description
5. Copy your Client ID and Client Secret

### 3. Set Up MongoDB Atlas
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Add your IP address to the whitelist
4. Create a database user
5. Get your connection string

### 4. Configure Environment Variables
Create a `.env` file in the root directory:
```
MONGODB_URI=your_mongodb_connection_string
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
PORT=3000
```

### 5. Start the Server
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

## API Endpoints Documentation

### Search for Tracks
**GET** `/api/search?q=search_term`

Search for tracks on Spotify.

**Query Parameters:**
- `q` (required): Search term

**Example Request:**
```
GET http://localhost:3000/api/search?q=bohemian+rhapsody
```

**Example Response:**
```json
{
  "query": "bohemian rhapsody",
  "count": 10,
  "tracks": [
    {
      "id": "3z8h0TU7ReDPLIbEnYhWZb",
      "name": "Bohemian Rhapsody",
      "artist": "Queen",
      "album": "A Night at the Opera",
      "preview_url": "https://...",
      "image": "https://..."
    }
  ]
}
```

**Error Response (400):**
```json
{
  "error": "Search query is required",
  "example": "/api/search?q=bohemian+rhapsody"
}
```

---

### Favorites

#### Create Favorite
**POST** `/api/favorites`

Save a track to favorites.

**Request Body:**
```json
{
  "spotifyId": "3z8h0TU7ReDPLIbEnYhWZb",
  "trackName": "Bohemian Rhapsody",
  "artistName": "Queen",
  "albumName": "A Night at the Opera",
  "previewUrl": "https://...",
  "imageUrl": "https://..."
}
```

**Success Response (201):**
```json
{
  "message": "Track added to favorites",
  "favorite": {
    "_id": "...",
    "spotifyId": "3z8h0TU7ReDPLIbEnYhWZb",
    "trackName": "Bohemian Rhapsody",
    "artistName": "Queen",
    "albumName": "A Night at the Opera",
    "previewUrl": "https://...",
    "imageUrl": "https://...",
    "addedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "error": "Missing required fields",
  "required": ["spotifyId", "trackName", "artistName", "albumName", "imageUrl"]
}
```

**Error Response (400 - Duplicate):**
```json
{
  "error": "This track is already in your favorites",
  "favorite": {...}
}
```

---

#### Get All Favorites
**GET** `/api/favorites`

Retrieve all saved favorites.

**Success Response (200):**
```json
{
  "count": 5,
  "favorites": [
    {
      "_id": "...",
      "spotifyId": "3z8h0TU7ReDPLIbEnYhWZb",
      "trackName": "Bohemian Rhapsody",
      "artistName": "Queen",
      "albumName": "A Night at the Opera",
      "previewUrl": "https://...",
      "imageUrl": "https://...",
      "addedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

#### Get Single Favorite
**GET** `/api/favorites/:id`

Get a specific favorite by ID.

**Success Response (200):**
```json
{
  "favorite": {
    "_id": "...",
    "spotifyId": "3z8h0TU7ReDPLIbEnYhWZb",
    "trackName": "Bohemian Rhapsody",
    "artistName": "Queen",
    "albumName": "A Night at the Opera",
    "addedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "error": "Favorite not found"
}
```

---

#### Delete Favorite
**DELETE** `/api/favorites/:id`

Remove a favorite from the database.

**Success Response (200):**
```json
{
  "message": "Favorite removed successfully",
  "favorite": {...}
}
```

**Error Response (404):**
```json
{
  "error": "Favorite not found"
}
```

---

### Playlists

#### Create Playlist
**POST** `/api/playlists`

Create a new playlist.

**Request Body:**
```json
{
  "playlistName": "My Awesome Playlist",
  "description": "A collection of my favorite songs"
}
```

**Success Response (201):**
```json
{
  "message": "Playlist created successfully",
  "playlist": {
    "_id": "...",
    "playlistName": "My Awesome Playlist",
    "description": "A collection of my favorite songs",
    "tracks": [],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "error": "Playlist name is required"
}
```

---

#### Get All Playlists
**GET** `/api/playlists`

Retrieve all playlists.

**Success Response (200):**
```json
{
  "count": 3,
  "playlists": [
    {
      "_id": "...",
      "playlistName": "My Awesome Playlist",
      "description": "A collection of my favorite songs",
      "tracks": [],
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

#### Get Single Playlist
**GET** `/api/playlists/:id`

Get a specific playlist by ID.

**Success Response (200):**
```json
{
  "playlist": {
    "_id": "...",
    "playlistName": "My Awesome Playlist",
    "description": "A collection of my favorite songs",
    "tracks": [
      {
        "spotifyId": "3z8h0TU7ReDPLIbEnYhWZb",
        "trackName": "Bohemian Rhapsody",
        "artistName": "Queen"
      }
    ],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "error": "Playlist not found"
}
```

---

#### Add Track to Playlist
**PUT** `/api/playlists/:id/tracks`

Add a track to an existing playlist.

**Request Body:**
```json
{
  "spotifyId": "3z8h0TU7ReDPLIbEnYhWZb",
  "trackName": "Bohemian Rhapsody",
  "artistName": "Queen"
}
```

**Success Response (200):**
```json
{
  "message": "Track added to playlist",
  "playlist": {
    "_id": "...",
    "playlistName": "My Awesome Playlist",
    "tracks": [
      {
        "spotifyId": "3z8h0TU7ReDPLIbEnYhWZb",
        "trackName": "Bohemian Rhapsody",
        "artistName": "Queen"
      }
    ],
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "error": "Missing required track fields",
  "required": ["spotifyId", "trackName", "artistName"]
}
```

**Error Response (404):**
```json
{
  "error": "Playlist not found"
}
```

---

#### Delete Playlist
**DELETE** `/api/playlists/:id`

Remove a playlist from the database.

**Success Response (200):**
```json
{
  "message": "Playlist deleted successfully",
  "playlist": {...}
}
```

**Error Response (404):**
```json
{
  "error": "Playlist not found"
}
```

---

## Testing with Postman

1. Import the endpoints into Postman
2. Set the base URL to `http://localhost:3000`
3. Test the search endpoint first to get track data
4. Copy track data from search results to create favorites
5. Create playlists and add tracks to them

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- Spotify Web API
- Axios for HTTP requests
- dotenv for environment variables
- cors for cross-origin requests

## Project Structure

```
spotify-music-explorer/
├── config/
│   ├── database.js       # MongoDB connection
│   └── spotify.js        # Spotify API integration
├── models/
│   ├── Favorite.js       # Favorite track schema
│   └── Playlist.js       # Playlist schema
├── routes/
│   ├── favorites.js      # Favorites CRUD routes
│   ├── playlists.js      # Playlists CRUD routes
│   └── search.js         # Spotify search route
├── .env                  # Environment variables (not committed)
├── .env.example          # Environment template
├── .gitignore
├── package.json
├── README.md
└── server.js             # Main server file
```

## Key Implementation Details

### Spotify API Authentication
Uses Client Credentials flow with base64 encoded client ID and secret.

### Database Schema Design
- Favorites store complete track information for offline access
- Playlists contain arrays of track objects with essential info
- Timestamps track when data was created/updated

### Error Handling
All routes include try/catch blocks with appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad request (validation error)
- 404: Not found
- 500: Server error

### Data Validation
- Required fields checked before database operations
- Duplicate favorites prevented by checking spotifyId
- Clear error messages returned for missing data
