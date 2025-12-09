const mongoose = require("mongoose");
require("dotenv").config();
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

// Success message on connect
database.once("open", async () => {
  console.log("Connected to MongoDB successfully!");

  // return records from one of the collections

  // Grab the Images collection off of Codecademy db
  // selection the collection

  // make sure to select the correct collection name
  //const imagesCollection = database.collection("Images");
  // would return an empty array of data
  const imagesCollection = database.collection("Images");

  // do the find command
  // remember to async / await any promises
  // promises are used on I/O operations such as reading from
  // a database
  const allImages = await imagesCollection.find().toArray();

  console.log("all images", allImages);
});
