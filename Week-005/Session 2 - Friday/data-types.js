<<<<<<< HEAD
//integer
let myNum = 5;

// float - numbers with fractions or decimals

const pi = 3.14; //const cant be reassigned

// boolean - boolean logic

let isSunny = false;

// strings - a single character to any number of characters

const letter = "a"; //double or single quotes
const paragraph = "lorem ipsum... etc.";

// (Concatenation) Two strings together

const addedStrings = "this is the first half" + "this is the second half";
const greeting = "Hello,";
const fullGreeting = greeting + "Bob";

console.log(fullGreeting);

//template literals
//backtick - next to number 1 on keyboard: `
//The below example is how you can use the template literal to include spaces in strings without adding them to your variables

const templateLiteral = `${greeting} Bob`;
console.log(templateLiteral);

// length check
console.log(templateLiteral.length);

//toUpperCase, toLowerCase

console.log(fullGreeting.toUpperCase());

// Null - Specifically set a value to nothing (specifically objects)

let myString = null;
console.log(myString);

// Undefined - what happens when you declare a variable but don't set it to anything
let declaredVar;
console.log(declaredVar);

// Variables can change data types in JS (you CAN do it, but try NOT to do it-- can cause tons of errors)

declaredVar = 5;
console.log(declaredVar);
declaredVar = "This is a string";
console.log(declaredVar);

// When we reassign variables, we are pointing to something else, not the same container (see Capacities Note)

let description = "Sunny"
let holder = description
description = "cloudy"

console.log(description)
=======
//integer
let myNum = 5;

// float - numbers with fractions or decimals

const pi = 3.14; //const cant be reassigned

// boolean - boolean logic

let isSunny = false;

// strings - a single character to any number of characters

const letter = "a"; //double or single quotes
const paragraph = "lorem ipsum... etc.";

// (Concatenation) Two strings together

const addedStrings = "this is the first half" + "this is the second half";
const greeting = "Hello,";
const fullGreeting = greeting + "Bob";

console.log(fullGreeting);

//template literals
//backtick - next to number 1 on keyboard: `
//The below example is how you can use the template literal to include spaces in strings without adding them to your variables

const templateLiteral = `${greeting} Bob`;
console.log(templateLiteral);

// length check
console.log(templateLiteral.length);

//toUpperCase, toLowerCase

console.log(fullGreeting.toUpperCase());

// Null - Specifically set a value to nothing (specifically objects)

let myString = null;
console.log(myString);

// Undefined - what happens when you declare a variable but don't set it to anything
let declaredVar;
console.log(declaredVar);

// Variables can change data types in JS (you CAN do it, but try NOT to do it-- can cause tons of errors)

declaredVar = 5;
console.log(declaredVar);
declaredVar = "This is a string";
console.log(declaredVar);

// When we reassign variables, we are pointing to something else, not the same container (see Capacities Note)

let description = "Sunny"
let holder = description
description = "cloudy"

console.log(description)
>>>>>>> 047484b (Post Calc Project commit)
console.log(holder)