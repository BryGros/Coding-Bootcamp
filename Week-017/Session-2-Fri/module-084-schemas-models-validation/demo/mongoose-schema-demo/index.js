//We need to import our database function
const connectDatabase = require("./config/database")
// import our model
const Student = require("./models/student");
const mongoose = require("mongoose");

connectDatabase();
// once code here
mongoose.connection.once("open", async () => {
  // CRUD example

  //Create
  // equivalent to db.Students.insertOne(<object>);
  await Student.insertOne({
    name: "Bilbo Baggins",
    email: "hobbit@hobbiton.com",
  });

  //Read
  // equivalent to the db.Students.find() on MongoDb
  const students = await Student.find(); // Read  from CRUD

  //Update
  // equivalent to db.Students.updateOne(<object>)
  await Student.updateOne(
    { name: "Bilbo Baggins" },
    { $set: { email: "hobbit@hotmail.com" } }
  );

  //Delete
  // equivalent to db.Students.deleteOne(<object>);
  await Student.deleteOne({
    email: "bob@codecademy.com",
  });
  console.log("Students are:", students);
});
  