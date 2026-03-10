const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");

router.post("/", async (req, res) => {
  try {
    const duplicate = await Favorite.findOne({ trackId: req.body.trackId });
    if (duplicate) {
      return res
        .status(400)
        .json({ error: "This track is already in your favorites" });
    }
    const track = await Favorite.create(req.body);
    res.status(201).json({ message: "Added track to favorites", track: track });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const favoritesArray = await Favorite.find();
    favoritesArray.sort((a, b) => b.addedAt - a.addedAt);
    res.status(200).json({
      message:
        "Here are your favorite tracks, sorted from most recently added to first added",
      favoriteTracks: favoritesArray,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const track = await Favorite.findById(id);
    if (!track) {
      return res.status(404).json({
        error: "A track was not found in your favorites with this ID",
      });
    }
    res.status(200).json(track);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const track = await Favorite.findByIdAndDelete(id);
    if (!track) {
      return res.status(404).json({
        error: "A track was not found in your favorites with this ID",
      });
    }
    res.status(200).json({
      message: `Track with ID ${track.id} was succesfully removed from your favorites`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
