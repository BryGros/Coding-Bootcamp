const fruits = ["apple", "banana"];
const vegetables = ["carrot", "brocolli"];
const protiens = ["chicken", "tofu"];

const groceryList = [];

groceryList.push(fruits);
groceryList.push(vegetables);
groceryList.push(protiens);

console.log(groceryList)

groceryListFlat = []
groceryListFlat.push(...fruits)
groceryListFlat.push(...vegetables)
console.log(groceryListFlat)