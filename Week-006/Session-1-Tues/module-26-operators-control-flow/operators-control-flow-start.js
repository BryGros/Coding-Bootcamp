// Operators and Control Flow Practice - Starter Version
// Run this file in Quokka.js or JavaScript REPL for real-time feedback

console.log("=== Operators and Control Flow Practice ===");

// Exercise 1: Arithmetic Operators
// Practice basic math operations and operator precedence

// TODO: Create two variables for numbers
let num1 = 2;
let num2 = 9;

// TODO: Perform basic math operations (+, -, *, /, %)
// TODO: Try subtraction
let subtract = num2 - num1;
console.log(subtract);
// TODO: Try multiplication
let multiply = num2 * num1;
console.log(multiply);

// TODO: Try division
let division = num2 / num1;
console.log(division);

// TODO: Try modulus (remainder)
let mod = num2 % num1;
console.log(mod);

// TODO: Use increment and decrement operators
// TODO: Increment counter by 1 using ++
let counter = 0;
counter++;
console.log(counter);

// TODO: Decrement counter by 1 using --
countMinus = 5;
countMinus--;
console.log(countMinus);

// TODO: Use compound assignment operators
// TODO: Add 50 to score using +=
let score = 50;
score += 50;
console.log(score);

// TODO: Multiply score by 2 using *=
score *= 2;
console.log(score);

console.log("Exercise 1 completed!");

// Exercise 2: Comparison Operators
// Practice equality and relational comparisons

// TODO: Create variables to test comparisons
let val1 = 5;
let val2 = "5";
// TODO: Compare using equality (==) - checks value only
console.log(val1 == val2);

// TODO: Compare using strict equality (===) - checks value and type
console.log(val1 === val2);

// TODO: Try inequality (!=) and strict inequality (!==)
console.log(val1 != val2);
console.log(val1 !== val2);
// TODO: Use relational operators (<, >, <=, >=)
console.log(val1 <= val2);

console.log("Exercise 2 completed!");

// Exercise 3: Logical Operators
// Practice combining conditions

// TODO: Create variables for logical operator examples
let smallNum = 1;
let largeNum = 5;
let trueStat = true;
let falseStat = false;
// TODO: Use AND (&&) operator - both conditions must be true
console.log(smallNum <= largeNum && trueStat == true);
// TODO: Use OR (||) operator - at least one condition must be true
console.log(smallNum >= largeNum || trueStat == true);
// TODO: Use NOT (!) operator to negate a boolean
let neg = smallNum <= largeNum && trueStat == true;
console.log(neg);
console.log(!neg);
// TODO: Combine multiple logical operators
console.log(smallNum <= largeNum && trueStat == true);
console.log("Exercise 3 completed!");

// Exercise 4: Conditional Statements
// Practice if/else statements, switch statements, and ternary operator

// TODO: Create a temperature variable

// TODO: Write an if statement

// TODO: Add an else statement

// TODO: Add else if for multiple conditions

// TODO: Use ternary operator for simple condition
// Format: condition ? valueIfTrue : valueIfFalse

// TODO: Use switch statement for day of the week
// Create a variable for day of the week and a switch statement that prints the day name

console.log("Exercise 4 completed!");

// Exercise 5: Loop Structures
// Practice for loops, while loops, and loop control

// TODO: Create a for loop that counts from 1 to 5

// TODO: Create a while loop that counts down from 5 to 1

// TODO: Challenge - Create a for loop from 1 to 10, but use break to exit when you reach 6

// TODO: Challenge - Create a for loop from 1 to 5, but use continue to skip number 3

// TODO: Create a nested loop (loop inside a loop)

console.log("Exercise 5 completed!");
console.log(
  "All exercises completed! Run the complete version to see solutions."
);
