const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_CONNECT);
console.log("Connecting to MongoDB...");

const database = mongoose.connection;

database.on("error", (error) => {
  console.error("MongoDb connection error:", error);
});

database.once("open", async () => {
  const moviesCollection = database.useDb("sample_mflix").collection("movies");

  console.time("movieQuery");
  // Time the query without any filtering - find ALL of the movies - 4 seconds +
  // const allMovies = await moviesCollection.find().toArray();
  // Time the query without any filtering - find 10 movies - 40 ms
  const allMovies = await moviesCollection.find().limit(10).toArray();
  console.timeEnd(`movieQuery`);
  console.log(`for ${allMovies.length} movies`);
});
