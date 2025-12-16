// simple file operations with Node

// We'll need to pull out to built-out libraries

const fs = require("fs");
const path = require("path");

// create file
function createFile(filename, content) {
  console.log("Creating file", filename);
  fs.writeFile(filename, content, (err) => {
    if (err) {
      console.log("Error creating files", err.message);
    }
    console.log("File created succesfully");
  });
}

const fn = "test.txt";
const fc = "Hello World!";

createFile(fn, fc);

// Practice

// readFile
function readFile(filename) {
  console.log("Attempting to read file", filename);
  fs.readFile(filename, "utf8", (err, data) => {
    if (err) {
      console.log("Error reading file", err.message);
    }
    console.log(data);
  });
}

readFile("test.txt");
// read the file back out to the console
