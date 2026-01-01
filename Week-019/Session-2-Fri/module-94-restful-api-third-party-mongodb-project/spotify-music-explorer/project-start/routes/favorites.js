// routes/favorites.js
// Routes for managing favorite tracks

// TODO: Import express and create a router


// TODO: Import the Favorite model


// TODO: POST '/' - Create a new favorite
// 1. Validate required fields (spotifyId, trackName, artistName, albumName, imageUrl)
// 2. Check if track already exists (findOne by spotifyId)
// 3. If exists, return 400 with error message
// 4. Create new Favorite and save to database
// 5. Return created favorite with 201 status
// 6. Handle errors with try/catch


// TODO: GET '/' - Get all favorites
// 1. Use Favorite.find() to get all favorites
// 2. Sort by addedAt descending (newest first)
// 3. Return favorites array with 200 status
// 4. Handle errors with try/catch


// TODO: GET '/:id' - Get a single favorite by ID
// 1. Use Favorite.findById() with req.params.id
// 2. If not found, return 404
// 3. Return favorite with 200 status
// 4. Handle errors with try/catch


// TODO: DELETE '/:id' - Delete a favorite
// 1. Use Favorite.findByIdAndDelete() with req.params.id
// 2. If not found, return 404
// 3. Return success message with 200 status
// 4. Handle errors with try/catch


// TODO: Export the router
