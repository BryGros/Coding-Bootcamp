// JavaScript Basics Practice - Starter Version
// Run this file in Quokka.js or JavaScript REPL for real-time feedback

console.log("=== JavaScript Basics Practice ===");

// Exercise 1: Variable Declarations vs Initializations
// Learn the difference between declaring and initializing variables

// TODO: Declare a variable without initializing it using let
let variable;
// TODO: Log the variable to see what undefined looks like
console.log(variable);
// TODO: Now initialize the variable with your name
variable = "Bryan";
// TODO: Log it again to see the difference
console.log(variable);
// TODO: Try declaring a const without initialization (this will cause an error)
// Uncomment the line below to see what happens:
// const PI;

// TODO: Declare and initialize a const properly with the value 3.14159
const pi = 3.14159;
console.log("Exercise 1 completed!");

// Exercise 2: Primitive Data Types
// Work with different data types and explore their typeof

// TODO: Create a number variable for age
let age = 36;
// TODO: Create a string variable for first name
let firstName = "Bryan";
// TODO: Create a boolean variable for isStudent
let isStudent = "false";
// TODO: Create a variable but don't assign it a value (to see undefined)
let noValueVar;
// TODO: Create a variable and explicitly set it to null
let nullVal = null;
// TODO: Use typeof to check the data type of each variable
// Example: console.log("age type:", typeof age);
console.log(typeof nullVal);
console.log("Exercise 2 completed!");

// Exercise 3: String Operations
// Practice string concatenation and template literals

// TODO: Create two string variables for first and last name
let lastName = "Grossbitch";
// TODO: Concatenate them using the + operator
let fullName = firstName + " " + lastName;
console.log(fullName);
// TODO: Create a greeting message using template literals (backticks)
let greeting = "Hi there,";
let fullGreeting = `${greeting} ${fullName}`;
console.log(fullGreeting);
// TODO: Get the length of your full name string
console.log(fullName.length);
// TODO: Convert first name to uppercase
let firstNameCaps = firstName.toUpperCase();
// TODO: Convert last name to lowercase
let lastNameLower = lastName.toLowerCase();
console.log(firstNameCaps);
console.log(lastNameLower);
console.log("Exercise 3 completed!");

// Exercise 4: Variable Assignment and Reassignment
// Practice changing variable values

// TODO: Create a let variable called score with initial value 0
let score = 0;
// TODO: Log the initial score
console.log(score);
// TODO: Reassign score to 100
score = 100;
// TODO: Log the updated score
console.log(score);
// TODO: Create a const variable called maxScore set to 100
const maxScore = 100;
// TODO: Try to reassign maxScore (this will cause an error)
// Uncomment the line below to see what happens:
// maxScore = 200;

console.log("Exercise 4 completed!");

// Exercise 5: Variable Assignment Creates New Containers
// Understand how variables are independent containers

// TODO: Create a variable originalScore with value 85
let originalScore = 85;
// TODO: Create a new variable copiedScore and assign originalScore's value to it
let copiedScore = originalScore;
// TODO: Log both variables to see they have the same value
console.log(originalScore);
console.log(copiedScore);
// TODO: Now change copiedScore to 95
copiedScore = 95;
// TODO: Log both variables again - notice originalScore stays the same!
console.log(originalScore);
console.log(copiedScore);
// This shows each variable is its own independent "container"

console.log("Exercise 5 completed!");
console.log(
  "All exercises completed! Run the complete version to see solutions."
);
