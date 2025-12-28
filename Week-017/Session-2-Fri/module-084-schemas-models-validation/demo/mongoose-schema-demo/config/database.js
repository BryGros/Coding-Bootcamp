const mongoose = require("mongoose");
require("dotenv").config();

function connectDatabase() {
  // Connect to local Mongo DB

  // use the mongoose object and call connect with our URI
  //mongoose.connect("mongodb://localhost:27017/Codecademy");
  // we want to extract this out to a env variable which will protect our
  // secrets

  mongoose.connect(process.env.MONGODB_URI);

  console.log("Connecting to MongoDB...");

  // grab the connectino object
  const database = mongoose.connection;

  // Handle Errors - This will give us feedback if we have issues
  database.on("error", (error) => {
    console.error("MongoDb connection error:", error);
  });

  // Handle successful connection
  database.once("open", () => {
    console.log("Connected to MongoDB successfully!");
    console.log("Database name:", database.name);
  });

  // Handle disconnection
  database.on("disconnected", () => {
    console.log("MongoDB disconnected");
  });
}

module.exports = connectDatabase;