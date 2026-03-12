const { add, subtract, multiply } = require("./math");

test("add takes in 2,3 and returns 5", () => {
  expect(add(2, 3)).toBe(5);
});

test("subtract takes in 5,2 and returns 3", () => {
  expect(subtract(5, 2)).toBe(3);
});

test("multiply takes in 3,4 and returns 12", () => {
  expect(multiply(3, 4)).toBe(12);
});
