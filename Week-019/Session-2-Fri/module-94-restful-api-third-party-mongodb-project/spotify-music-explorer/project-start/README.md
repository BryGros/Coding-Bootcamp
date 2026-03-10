# Spotify Music Explorer API

A RESTful API that integrates with the Spotify API to search for music, save favorite tracks, and create custom playlists.

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

## API Endpoints

### Search for Tracks
**GET** `/api/search?q=search_term`

Search for tracks on Spotify.

**Example:**
```
GET http://localhost:3000/api/search?q=bohemian+rhapsody
```

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

#### Get All Favorites
**GET** `/api/favorites`

Retrieve all saved favorites.

#### Get Single Favorite
**GET** `/api/favorites/:id`

Get a specific favorite by ID.

#### Delete Favorite
**DELETE** `/api/favorites/:id`

Remove a favorite from the database.

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

#### Get All Playlists
**GET** `/api/playlists`

Retrieve all playlists.

#### Get Single Playlist
**GET** `/api/playlists/:id`

Get a specific playlist by ID.

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

#### Delete Playlist
**DELETE** `/api/playlists/:id`

Remove a playlist from the database.

## Testing

Use Postman, Thunder Client, or cURL to test the API endpoints.

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- Spotify Web API
- Axios for HTTP requests

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
