// Remember the examples

// function name(params) {
// code we want to happen
// }

function addOne(num) {
  let number = 0;
  if (num >= 15) {
    number = num;
  } else {
    number = num+1;
  }
  console.log(number);
}

addOne(12);

function add(x,y) {
  console.log(x + y);
}

add(1, 3);
add(12, 10);

// return keyword returns the value back to where it was called

function addWithReturn(x,y) {
    return x + y
}

let sum = addWithReturn(3,4)

console.log(sum)