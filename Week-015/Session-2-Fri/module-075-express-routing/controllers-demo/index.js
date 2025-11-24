// Simple Routing Demo

const express = require("express");
const app = express();

// middleware
app.use(express.json());

//usually this data is in the database
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

// Get all users

app.get("/users", (req, res) => {
  // return back users and count in new object when we visit localhost:3000/users
  // you can do this in Postman.browser/whatever other tool
  res.json({
    users: users,
    count: users.length,
  });
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
