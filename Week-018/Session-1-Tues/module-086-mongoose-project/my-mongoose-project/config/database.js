const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = () => {
  mongoose.connect(process.env.MONGODB_URI);
  // grab the connection  object
  const database = mongoose.connection;

  // Error message when unable to connect
  database.on("error", (error) => {
    console.error("MongoDb connection error:", error);
  });
  //Success message on connect
  database.once("open", async () => {
    console.log("Connected to MongoDB successfully!");
  });
  // Message when disconnecting
  database.on("disconnect", () => {
    console.log("Disconnected from MongoDB");
  });
};

module.exports = connectToDatabase;
