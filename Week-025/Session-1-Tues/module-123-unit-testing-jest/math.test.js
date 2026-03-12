const { add, subtract, multiply } = require("./math");

// arrange
// act
// assert

// arrange - doing data setup

// act - executes the function or action

// assert - expect/assert - contract around what
// the expected result
// throws an error if the expected value is wrong

// alternative less specific to values 
// but more about the functionality

// "add takes in positive numbers and returns correct positive value"

//arrange/act/assert all in one
// test("add takes in 2,3 and returns 5", () => {
//   expect(add(2, 3)).toBe(5);
// });


// tests as contracts
// provide a safety net
// help give me confidence when I make changes to a codebase

test("add takes in 2,3 and return 5", ()=>{
  //arrange - any data setup that is needed
  // faking out dependencies
  let a = 2;
  let b = 3;

  // act
  let result = add(a, b);

  // assert
  expect(result).toBe(5);

})

test("subtract takes in 5,2 and returns 3", () => {
  expect(subtract(5, 2)).toBe(3);
});

test("multiply takes in 3,4 and returns 12", () => {
  expect(multiply(3, 4)).toBe(12);
});

// 1.Add a new test
// 2.Update the description to "divide takes... and returns..."
// 3. Add the callback function (arrow)
// 4. Add 3 comments for arrange, act, assert
// 5. setup the arrange with your two input variables
// 6. create the result variable and call the divide function with inputs
// 7. pass result to expect and put in the expected value in toBe