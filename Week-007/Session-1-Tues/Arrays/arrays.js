const numbers = [2, 3, 4, 8];
const strings = ["abc", "def", "hij"];
const fruits = ["banana", "kiwi", "cherry", "apple", "strawberry"];

console.log(fruits[4]);

// For loop with arrays
// fruits.length returns the length of the list (how many items are in there)
for (let index = 0; index < fruits.length; index++) {
  const element = fruits[index];
  console.log(element);
}

// Steps over every item in the index without worrying about an index
for (const element of fruits) {
  console.log(element);
}

// Adding and removing from arrays

const myArray = []
// Array methods (functions) that work with Array Objects
// Use MDN to see methods for Arrays and parameters - they have different inputs/outputs
// Keep in mind if you're modifying the array or not
// Use the most common usage - don't get bogged down in the details

myArray.push(1)
console.log(myArray)

console.log(myArray.push(11)) // .push returns the length of the array

// Other common methods: map, find, includes, filter, reduce, some, every, splice, slice

// reduce is for summing values and manipulating values, and can change shape

let string = "test string"
console.log(string[2])