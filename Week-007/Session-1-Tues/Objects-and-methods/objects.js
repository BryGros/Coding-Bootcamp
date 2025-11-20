// Car

// methods > action -> accelerate
//  properties > attributes about that object > color

// properties: year, make, model, color, price, maxSpeed

// methods: accelerate, brake, start

const myCar = {};
myCar.year = 2016;
myCar.make = "Ford";
myCar.model = "Focus";

console.log(myCar);

const OtherCar = {
  year: 2000,
  nested: { nestedProperty: "nestedValue" },
};

// You can access by dot and bracket notation
console.log(myCar.year);
console.log(myCar["year"]);

console.log(OtherCar.nested.nestedProperty);
console.log(OtherCar["nested"]["nestedProperty"])

