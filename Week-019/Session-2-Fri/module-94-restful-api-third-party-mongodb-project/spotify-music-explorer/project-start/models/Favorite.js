// models/Favorite.js
// Mongoose model for favorite tracks

// TODO: Import mongoose
const mongoose = require("mongoose");

const favoritesSchema = new mongoose.Schema({
  trackId: {
    type: String,
    required: [true, "You must indicate a track to add to your favorites"],
    unique: true,
  },
  name: {
    type: String,
    required: [
      true,
      "You must enter the track's name to add it to your favorites",
    ],
  },
  artist: {
    type: String,
    required: [
      true,
      "Please enter the artist's name to save this track to your favorites",
    ],
  },
  album: {
    type: String,
    required: [true, "You must enter the album for this song to favorite it"],
  },
  previewUrl: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: [true, "You must enter the image URL to favorite this track"],
  },
  addedAt: {
    type: Date,
    default: new Date(),
  },
});

// TODO: Create and export the Favorite model
module.exports = mongoose.model("Favorites", favoritesSchema);
