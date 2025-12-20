const Movie = require("../models/Movie");

// Step 1 pagination
// GET all moviews with pagination and filtering
// async function getAllMovies(req, res) {
//   try {
//     // Parse pagination parameters with defaults
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 20;

//     // Calculate how many items to skip
//     // page=3 - I need to skip how many items?
//     // skip 20 items based on a limit of 10
//     // skip 40 items based on a limit of 20
//     const skip = (page - 1) * limit;

//     //const total = await Movie.countDocuments();

//     const movies = await Movie.find().skip(skip).limit(limit);

//     //const totalPages = Math.ceil(total / limit);

//     res.json({
//       movies, // movies: movies
//     });
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//     res.status(500).json({
//       error: "Failed to fetch movies",
//       message: error.message,
//     });
//   }
// }

// Step 2 - Pagination + Filtering
async function getAllMovies(req, res) {
  try {
    // Parse pagination parameters with defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    // Calculate how many items to skip
    // page=3 - I need to skip how many items?
    // skip 20 items based on a limit of 10
    // skip 40 items based on a limit of 20
    const skip = (page - 1) * limit;

    // to do any filtering we will need a filter object
    const filter = {};

    // Genre filter (movie can have multiple genres)
    if (req.query.genre) {
      filter.genres = req.query.genre;
    }

    //const total = await Movie.countDocuments();

    const movies = await Movie.find(filter)
      .skip(skip)
      .limit(limit)
      .select(
        "title year rated runtime genres directors cast plot imdb.rating imdb.votes"
      ) // returns a subset of the properties that we care about - thus limiting the data payload
      ;

    //const totalPages = Math.ceil(total / limit);

    res.json({
      movies, // movies: movies
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({
      error: "Failed to fetch movies",
      message: error.message,
    });
  }
}

module.exports = {
  getAllMovies,
};
