# Spotify Music Explorer - Assessment Rubric

## Project Overview

This rubric evaluates the Spotify Music Explorer project based on RESTful APIs, third-party API integration, and MongoDB concepts covered in modules 087-093. Students will build a simple API that searches the Spotify API and saves favorite tracks to MongoDB Atlas.

### What should I make?

Build a **Music Favorites API** that allows users to search for songs using Spotify and save their favorite tracks to a database. Your API should have:
- **Search** - Search for tracks using Spotify API
- **Favorites** - Save and manage favorite tracks in MongoDB

**Note:** This is a backend-only project. Test with Postman or curl, no frontend needed.

---

## **Must Have (Required for Passing):**

### **Express.js API Implementation**

- [ ] **Express Setup** - Express.js project with package.json and proper dependencies
- [ ] **Server Configuration** - Express app with port configuration and environment variables
- [ ] **Search Endpoint** - GET /api/search?q=song endpoint that queries Spotify API
- [ ] **Favorites CRUD** - Full CRUD operations (GET, POST, DELETE) for favorites at /api/favorites
- [ ] **Express Router** - Separate route files (routes/search.js and routes/favorites.js)
- [ ] **Request/Response** - Properly handles requests and sends JSON responses

### **MongoDB/Mongoose Integration**

- [ ] **MongoDB Atlas Connection** - Connected to MongoDB Atlas cloud database
- [ ] **Mongoose Schema** - Favorite schema with fields: trackId, name, artist, album, previewUrl
- [ ] **Schema Validation** - Required fields marked, unique trackId to prevent duplicates
- [ ] **Error Handling** - Handles connection errors and validation errors appropriately

### **Spotify API Integration**

- [ ] **Spotify Authentication** - Implements Client Credentials OAuth flow
- [ ] **Search Function** - Searches Spotify API for tracks
- [ ] **Response Parsing** - Extracts relevant track data from Spotify response
- [ ] **Error Handling** - Handles API errors (rate limits, network failures)

### **API Endpoints**

- [ ] **GET /api/search?q=query** - Search Spotify for tracks, return simplified results
- [ ] **GET /api/favorites** - Get all saved favorite tracks from database
- [ ] **POST /api/favorites** - Save a track to favorites (with duplicate prevention)
- [ ] **DELETE /api/favorites/:id** - Remove a track from favorites

### **Environment and Configuration**

- [ ] **Environment Variables** - SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, MONGODB_URI in .env
- [ ] **.env.example** - Template showing required variables (no actual keys)
- [ ] **.gitignore** - Excludes node_modules/ and .env

---

## **Could Have (Bonus Points):**

### **Enhanced Features**
- [ ] **Playlist Support** - Create and manage playlists with multiple tracks
- [ ] **Advanced Search** - Search by artist, album, or multiple criteria
- [ ] **Pagination** - Implement pagination for favorites list
- [ ] **Track Details** - GET /api/favorites/:id endpoint for single track details

---

## Submission Requirements

### **Technical Requirements:**
- [ ] **Working API** - All search and favorites endpoints functional
- [ ] **Spotify Integration** - Successfully connects to and queries Spotify API
- [ ] **MongoDB Storage** - Favorites persist in MongoDB Atlas
- [ ] **Environment Config** - All sensitive data in environment variables

### **Project Structure Requirements:**
```
spotify-music-explorer/
├── server.js
├── package.json
├── .env (not committed)
├── .env.example
├── .gitignore
├── routes/
│   ├── search.js
│   └── favorites.js
└── models/
    └── Favorite.js
```

### **API Interface Requirements:**
- [ ] **RESTful Design** - Follows REST conventions for URLs and HTTP methods
- [ ] **Consistent Responses** - All endpoints return JSON in consistent format
- [ ] **HTTP Status Codes** - Uses 200, 201, 400, 404, 500 appropriately
- [ ] **Documentation** - README with setup instructions and endpoint examples

### **Required API Endpoints:**

**Search:**
- `GET /api/search?q=song+name` - Search Spotify for tracks

**Favorites:**
- `GET /api/favorites` - Get all favorite tracks
- `POST /api/favorites` - Save track to favorites
- `DELETE /api/favorites/:id` - Remove track from favorites

### **Code Quality Requirements:**
- [ ] **Clean Code** - Readable code with descriptive variable names
- [ ] **Error Handling** - Try/catch blocks around async operations
- [ ] **No Hardcoded Secrets** - All API keys in environment variables
- [ ] **Comments** - Key integration points explained

**Due Date:** By Next Project
**Submission Method:** GitHub repository link on #projects channel
