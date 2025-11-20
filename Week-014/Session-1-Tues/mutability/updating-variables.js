let myNumber = 5;

// we're changing the reference to the container, not to the value

let myCopy = myNumber;

myNumber = 20;

console.log(myNumber);
console.log(myCopy);

// In objects and arrays, we're able to update data without changing the reference (mutable)

// Primitives (numbers, strings, booleans, etc) are immutable-- when we change the value, we're really changing the reference to the container from the original value to a container with the new value
