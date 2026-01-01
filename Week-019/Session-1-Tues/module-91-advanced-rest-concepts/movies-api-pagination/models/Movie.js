const mongoose = require("mongoose");

// Movie schema based on MongoDB Atlas sample_mflix database
const movieSchema = new mongoose.Schema(
  {
    title: String,
    year: Number,
    rated: String,
    runtime: Number,
    genres: [String],
    directors: [String],
    cast: [String],
    plot: String,
    poster: String,
    imdb: {
      rating: Number,
      votes: Number,
    },
    countries: [String],
    released: Date,
  },
  {
    collection: "movies",
  }
);

// Use the sample_mflix database
const Movie = mongoose.connection
  .useDb("sample_mflix")
  .model("Movie", movieSchema);

module.exports = Movie;
