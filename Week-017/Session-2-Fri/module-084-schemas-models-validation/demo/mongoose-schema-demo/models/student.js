// import mongoose
const mongoose = require("mongoose");

// create "studentSchema"
    //name of type string
    // email of type string
const studentSchema = new mongoose.Schema({
    name: String,
    email: String
})

// create the model
const Student = mongoose.model("Student", studentSchema)

// export
module.exports = Student
