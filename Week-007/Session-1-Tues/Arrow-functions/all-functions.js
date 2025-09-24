function isNumberZero(number) {
  return number === 0;
}

console.log(isNumberZero(1));

// Function Expression - think of it like a non-names (annonymous) variable assigned with a function
// The below is a function expression that only allows one argument (one thing in the brackets aka code-block)

let myArray = [1, 2, 3, 0];

// find is a higher order function

myArray.find((element) => element === 0);
