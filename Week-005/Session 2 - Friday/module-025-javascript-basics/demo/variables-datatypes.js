// numbers

// integer
let myNum = 5;

console.log(myNum);

//float - numbers with fractions or decimals

const pi = 3.14; // const cant be reassigned

console.log(pi);

///pi = 5; reassignment error

// boolean - boolean logic

let isSunny = false;

// later in the day

isSunny = true;

// strings

// "a" => paragraphs of information

const letter = "a"; // double or single quotes around our strings

const paragraphs =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa suscipit deleniti quibusdam maiores atque pariatur repellat vero ullam dolorem repellendus placeat quasi iusto soluta perspiciatis praesentium quod tenetur, fugiat nisi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa suscipit deleniti quibusdam maiores atque pariatur repellat vero ullam dolorem repellendus placeat quasi iusto soluta perspiciatis praesentium quod tenetur, fugiat nisi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa suscipit deleniti quibusdam maiores atque pariatur repellat vero ullam dolorem repellendus placeat quasi iusto soluta perspiciatis praesentium quod tenetur, fugiat nisi!";

console.log(paragraphs);

//string concatenation
const addedStrings = "This is the first half" + "This is the second half";

console.log(addedStrings);

const greeting = "Hello, ";
const fullGreeting = greeting + "Bob";

console.log(fullGreeting);

// template literals

// backtick - next to the number 1 - `
const greetingNoSpace = "Hello,";
const templateLiteral = `${greeting} Bob`;
console.log(templateLiteral);

// how many characters does a string have
console.log(greetingNoSpace.length)

// toUpperCase, toLowerCase

console.log(greetingNoSpace.toUpperCase());
console.log(greetingNoSpace.toLowerCase());



// Null -> specifically set a value to nothing - Object

let myString = null;
console.log(myString)


//undefined

let declaredVariable;
console.log(declaredVariable)

declaredVariable = 5;
console.log(declaredVariable)

//variables can also change datatypes in Javascript

declaredVariable = "This is a string now"
console.log(declaredVariable)


// when we reassing variables we are pointing to something else not the
// same container

let description = "Sunny"

console.log(description)

let holder = description;

description = "Cloudy"

console.log(description)

console.log(holder)
