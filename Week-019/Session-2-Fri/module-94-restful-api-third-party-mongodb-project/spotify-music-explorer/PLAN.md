# Spotify Music Explorer - Development Plan

## Project Overview

Build a simple Music Favorites API that searches Spotify and saves favorite tracks to MongoDB Atlas. This project demonstrates third-party API integration, cloud database usage, and RESTful API design.

## IMPORTANT: Minimum vs Bonus Features

This plan focuses on **ONLY the 4 required endpoints**. Build these first, then add bonus features.

**Required Endpoints:**
1. GET /api/search?q=query
2. GET /api/favorites
3. POST /api/favorites
4. DELETE /api/favorites/:id

---

## What You Must Build (Required for Passing)

### Core Requirements:
1. Search Spotify API for tracks
2. Save favorite tracks to MongoDB
3. Get all saved favorites
4. Delete favorites
5. Spotify Client Credentials OAuth
6. MongoDB Atlas cloud database
7. Environment variable configuration

---

## Planning Phase

### Step 0: Understand the Scope

This is a **backend-only API**. Test with Postman or curl.

**What this API does:**
- Searches Spotify for songs
- Saves your favorite tracks to a database
- Retrieves and deletes saved favorites

**What this API does NOT need (for minimum):**
- User accounts
- Authentication
- Playlists (bonus feature)
- Advanced search filters

### Step 1: Get Spotify API Credentials

Before coding, get your Spotify API keys:

1. Go to https://developer.spotify.com/dashboard
2. Log in with Spotify account (or create one)
3. Click "Create an App"
4. Enter any app name and description
5. Use https://example.org/callbackas the Redirect URI
6. "Which API/SDKs are you planning to use?" > Check Web API
7. Click Save (Note if you see "Your account is not ready, please wait a few minutes and try again." you may need to wait up to 1 hre to create your credentials )
7. Copy your Client ID and Client Secret

**Save these for your .env file!**

### Step 2: Set Up MongoDB Atlas

Create free cloud database:

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a free cluster (M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password

**Save connection string for .env file!**

### Step 3: Plan Your Data Model

**Favorite Schema (REQUIRED):**
- trackId (String, unique, required) - Spotify track ID
- name (String, required) - Track name
- artist (String, required) - Artist name
- album (String) - Album name
- previewUrl (String) - 30-second preview URL from Spotify
- imageUrl (String) - Album cover image
- addedAt (Date, default: Date.now)

**Why these fields?** 
- trackId: Prevents duplicates
- name/artist/album: Display information
- previewUrl: Play 30-second preview
- imageUrl: Show album art
- addedAt: Track when favorited

---

## Implementation Phase

### Phase 1: Project Setup (REQUIRED)

Initialize project:

```bash
mkdir spotify-music-explorer
cd spotify-music-explorer
npm init -y
npm install express mongoose dotenv cors
npm install --save-dev nodemon
```

**Why these packages?**
- express: Web server
- mongoose: MongoDB object modeling
- dotenv: Environment variables
- cors: Allow cross-origin requests

**Note:** We use native `fetch()` (built into Node.js 18+) for HTTP requests - no axios needed!

Add to package.json scripts:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Create folders:
```bash
mkdir routes models config
```

Create .env:
```
PORT=3000
MONGODB_URI=your-mongodb-atlas-connection-string
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
```

Create .env.example:
```
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/spotify-explorer
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
```

Create .gitignore:
```
node_modules/
.env
```

**Test:** Run `npm run dev` (will error - that's expected)

---

### Phase 2: Create Server File (REQUIRED)

Create `server.js`:
- Import express, mongoose, dotenv, cors
- Load environment variables with dotenv.config()
- Create Express app
- Apply middleware: cors(), express.json()
- Connect to MongoDB using mongoose.connect()
- Create root GET / route with API info
- Start server listening on PORT

**Test:** Server should start and connect to MongoDB

---

### Phase 3: Create Favorite Model (REQUIRED)

Create `models/Favorite.js`:

**Schema definition:**
- trackId: String, required, unique
- name: String, required
- artist: String, required
- album: String
- previewUrl: String
- imageUrl: String
- addedAt: Date, default: Date.now

**Why unique trackId?** Prevents saving same song twice.

**Test:** Import model in server.js, no errors should occur

---

### Phase 4: Spotify Authentication (REQUIRED)

Create `config/spotify.js`:

**getSpotifyToken function:**
- Use Client Credentials OAuth flow
- Make POST request to https://accounts.spotify.com/api/token
- Include client_id and client_secret as Basic Auth
- Set grant_type=client_credentials
- Return access token
- Cache token (expires in 1 hour)

**Why Client Credentials?**
- No user login needed
- Simpler than Authorization Code flow
- Perfect for searching public Spotify data

**Test:** Call function, log token to verify it works

---

### Phase 5: Search Route (REQUIRED)

Create `routes/search.js`:

**GET /?q=query:**
- Get search query from query params
- Validate query exists (return 400 if not)
- Get Spotify access token
- Make GET request to https://api.spotify.com/v1/search
- Include token in Authorization header
- Search for tracks: type=track, q=searchQuery, limit=10
- Parse response - extract relevant track data
- Return simplified track objects: id, name, artists, album, preview_url, image

**Error handling:**
- 400 if no query provided
- 500 if Spotify API fails
- Log errors for debugging

**Test with Postman:**
- GET http://localhost:3000/api/search?q=coldplay
- Should return array of tracks

---

### Phase 6: Favorites Routes (REQUIRED)

Create `routes/favorites.js`:

**GET / (get all favorites):**
- Query Favorite model: Favorite.find()
- Sort by addedAt descending (newest first)
- Return array of favorites

**POST / (save favorite):**
- Get track data from req.body (trackId, name, artist, album, previewUrl, imageUrl)
- Validate required fields exist
- Check if track already favorited (findOne by trackId)
- If exists, return 400 "Already favorited"
- Create new Favorite document
- Save to database
- Return created favorite with 201 status

**DELETE /:id (remove favorite):**
- Get MongoDB _id from params
- Find and delete: Favorite.findByIdAndDelete(id)
- If not found, return 404
- Return success message

**Error handling:**
- Try/catch all database operations
- Return appropriate status codes
- Clear error messages

**Test each endpoint:**
1. Save favorite - should create in database
2. Get favorites - should return array
3. Try to save duplicate - should return 400
4. Delete favorite - should remove from database
5. Try to delete non-existent - should return 404

---

### Phase 7: Mount Routes (REQUIRED)

In `server.js`:
- Import searchRouter from './routes/search'
- Import favoritesRouter from './routes/favorites'
- Mount routes:
  - app.use('/api/search', searchRouter)
  - app.use('/api/favorites', favoritesRouter)

**Test:** All 4 endpoints should be accessible

---

### Phase 8: Error Handling (REQUIRED)

Add global error handlers in server.js:

**404 Handler (after all routes):**
- Catch unmatched routes
- Return 404 JSON response

**MongoDB Connection Error:**
- Wrap mongoose.connect in try/catch
- Log error and exit if connection fails

**Spotify API Errors:**
- Handle rate limits (429)
- Handle network errors
- Return user-friendly messages

**Test:**
- Visit invalid route - should get 404
- Stop MongoDB - should see connection error
- Make too many Spotify requests - should handle gracefully

---

## Testing Your API

### Method 1: Postman Testing

Create collection:

**Search:**
1. GET http://localhost:3000/api/search?q=beatles
2. Should return 10 tracks

**Save Favorite:**
1. Copy track data from search results
2. POST http://localhost:3000/api/favorites
3. Body (JSON): {trackId, name, artist, album, previewUrl, imageUrl}

**Get Favorites:**
1. GET http://localhost:3000/api/favorites
2. Should see saved track

**Delete Favorite:**
1. Copy _id from favorites list
2. DELETE http://localhost:3000/api/favorites/:id
3. Should return success

### Method 2: curl Commands

**Search:**
```bash
curl "http://localhost:3000/api/search?q=coldplay"
```

**Save Favorite:**
```bash
curl -X POST http://localhost:3000/api/favorites \
  -H "Content-Type: application/json" \
  -d '{"trackId":"abc123","name":"Yellow","artist":"Coldplay","album":"Parachutes","previewUrl":"https://p.scdn.co/...","imageUrl":"https://i.scdn.co/..."}'
```

**Get Favorites:**
```bash
curl http://localhost:3000/api/favorites
```

**Delete Favorite:**
```bash
curl -X DELETE http://localhost:3000/api/favorites/MONGODB_ID_HERE
```

---

## Project Submission Checklist

**MUST HAVE (Required to Pass):**

```
Project Setup:
[ ] Express.js project with package.json
[ ] Dependencies installed (express, mongoose, dotenv, cors, axios)
[ ] .env file with all credentials (not committed)
[ ] .env.example file provided
[ ] .gitignore includes node_modules/ and .env

MongoDB:
[ ] Connected to MongoDB Atlas
[ ] Favorite model created with schema
[ ] Schema has validation (required, unique)
[ ] Handles connection errors

Spotify Integration:
[ ] Client Credentials OAuth implemented
[ ] getSpotifyToken function working
[ ] Search endpoint queries Spotify API
[ ] Token included in Authorization header
[ ] Handles Spotify API errors

API Endpoints (All 4 Required):
[ ] GET /api/search?q=query - searches Spotify
[ ] GET /api/favorites - returns all favorites
[ ] POST /api/favorites - saves favorite
[ ] DELETE /api/favorites/:id - removes favorite

Features:
[ ] Search returns simplified track data
[ ] Duplicate prevention (unique trackId)
[ ] Error handling on all routes
[ ] Proper HTTP status codes (200, 201, 400, 404, 500)
[ ] JSON responses

File Structure:
[ ] server.js (main file)
[ ] routes/search.js
[ ] routes/favorites.js
[ ] models/Favorite.js
[ ] config/ folder (optional but recommended)
```

---

## Could Have (Bonus Features)

**Only attempt AFTER completing all required features.**

### Bonus Feature 1: Playlists

Add playlist functionality:
- Create Playlist model (name, description, tracks array)
- POST /api/playlists - create playlist
- GET /api/playlists - get all playlists
- POST /api/playlists/:id/tracks - add track to playlist
- DELETE /api/playlists/:id - delete playlist

### Bonus Feature 2: Search by Artist/Album

Expand search capabilities:
- GET /api/search/artists?q=query
- GET /api/search/albums?q=query
- Return artist or album results

### Bonus Feature 3: Track Details

Get full track information:
- GET /api/favorites/:id - single favorite details
- Include more Spotify data (duration, popularity, etc.)

### Bonus Feature 4: Pagination

Add pagination to favorites:
- GET /api/favorites?page=1&limit=10
- Return paginated results with total count

### Bonus Feature 5: Categories/Tags

Organize favorites:
- Add category field to Favorite schema
- Filter favorites by category
- User-created tags

### Bonus Feature 6: Recently Played

Track listening history:
- Store timestamp when track played
- GET /api/recent - recent tracks

### Bonus Feature 7: Statistics

Add analytics:
- Count total favorites
- Most favorited artists
- Favorite genres

---

## Common Pitfalls to Avoid

1. **Hardcoding API keys** - Always use .env
2. **Not handling errors** - Wrap all async in try/catch
3. **Forgetting unique constraint** - trackId must be unique
4. **Wrong Spotify endpoint** - Use /v1/search with type=track
5. **Token not in header** - Must be "Bearer TOKEN"
6. **MongoDB connection string** - Replace <password> with actual password
7. **CORS errors** - Apply cors() middleware
8. **Returning too much data** - Simplify Spotify response before sending

---

## Tips for Success

1. **Get credentials first** - Can't code without Spotify + MongoDB access
2. **Test Spotify separately** - Use Postman to test Spotify API before coding
3. **Start with search** - Get search working before favorites
4. **One endpoint at a time** - Build and test each endpoint completely
5. **Use Postman collections** - Save all test requests
6. **Check MongoDB Compass** - View database to verify saves
7. **Read error messages** - They tell you exactly what's wrong
8. **Log everything during dev** - Console.log helps debug

Good luck building your Spotify Music Explorer API!
