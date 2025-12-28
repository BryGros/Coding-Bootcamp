const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"], //validations
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true, // No two users can have the same email
    },
  },
  {
    collection: "Students", // or whatever your actual collection name is
  }
);

// create the model on from our Mongoose object
const Student = mongoose.model("Student", studentSchema);

//Export the model
module.exports = Student;
