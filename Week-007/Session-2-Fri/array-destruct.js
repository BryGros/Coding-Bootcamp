// We will use this a lot in React

function getPerson() {
  // pretend we have to return an array
  return ["Bob", 40];
}

console.log(getPerson());
console.log(getPerson()[1]);

// not good practice

const [name, age] = getPerson();
console.log(name);
