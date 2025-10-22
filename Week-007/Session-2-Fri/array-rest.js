// Allows you to take all of the passed parameters and put them into a list

// rest parameter syntax - ... before a variable to collect all of the parameters passed to a function
function add(...theValues) {
  let total = 0;
  for (const element of theValues) {
    total += element;
  }
  console.log("total was", total);
}

add(1, 3, 10, 12, 15);
