// Basic Express app

//bring in the express factory function - require is import/export command with commonjs
// express in the require is actually in our node_modules folder and contains all the code/dependencies
const express = require("express");
// create the app object by runnning the express function
const app = express();

// set up the port
const PORT = 3010;

console.log("Starting Basic Express App");

// Exmaple code of adding a GET route vs a listener
// route:
//app.verb("path", callbackFunction)

//localhost:3010/hello
//app.get("/hello", callbackFunction)
app.get("/", (request, response) => {
  console.log("GET request received at /");
  // This is the response the user will get back-- don't typically do HTML, but just as an example
  response.send(`
        <h1>Hello, this is Bryan</h1>
        <p>This is your first Express.js application.</p>
        <p>Server running on port ${PORT}</p>`);
});

// start the server and wait for interactions
app.listen(PORT, ()=>{
    console.log("Express server running")
    console.log("Visit http://localhost:3010 to see the app")
    console.log("Press ctrl + C to stop the server")
})