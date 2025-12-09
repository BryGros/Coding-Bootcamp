// Import mongoose
const mongoose = require("mongoose");

// Define Shcema
// We want each document to have this shape
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

// create the model from the Schema
const User = mongoose.model("User", userSchema);

// export the model for use
module.exports = User;
