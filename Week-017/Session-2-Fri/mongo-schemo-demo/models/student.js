// import mongoose
const mongoose = require("mongoose");

//create "studentSchema"
const studentSchema = mongoose.Schema({
  name: String,
  email: String,
});

// create the model
const Student = mongoose.model("Student", studentSchema);

//export
module.exports = Student;
