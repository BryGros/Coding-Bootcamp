// Database connection configuration for MongoDB Atlas

const mongoose = require("mongoose");
require("dotenv").config();

const connectDatabase = () => {
  mongoose.connect(process.env.MONGODB_URI);
  const database = mongoose.connection;

  database.on("error", (error) => {
    console.error("MongoDB connection error: ", error);
  });

  database.once("open", () => {
    console.log("Connected to MongoDB successfully!");
    console.log("Database: ", database.name);
  });

  database.on("disconnect", () => {
    console.log("Disconnected from MongoDB");
  });
};

module.exports = connectDatabase;
