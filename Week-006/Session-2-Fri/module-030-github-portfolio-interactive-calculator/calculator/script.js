// ===================================================================
// DO NOT MODIFY THE CODE BELOW - Call or reference them in your code as needed
// ===================================================================

// Takes in a number and updates the readonly display input
function setDisplay(value) {
  const display = document.getElementById("display");
<<<<<<< HEAD
  display.value = String(parseFloat(value));
=======
  // adjusted to handle decimals (parseFloat created issues with displaying leading decimals)
  display.value = String(value);
>>>>>>> 047484b (Post Calc Project commit)
}

// Gets the value from the readonly display input
// Returns a number
// Doesn't need to be used but can help you verify
// the current value on the display
function getDisplay() {
  const display = document.getElementById("display");
  //parseFloat changes the string into a number we can use
  return display.value;
}

//Set up display to show zero when starting
setDisplay(0);
<<<<<<< HEAD

=======
>>>>>>> 047484b (Post Calc Project commit)
console.log("Initial value of display: ", getDisplay());

// ===================================================================
// DO NOT MODIFY THE CODE Above - Call or reference them in your code as needed
// ===================================================================
<<<<<<< HEAD
let firstOperand = null;
let operator = null;
let shouldResetDisplay = 0;

/**
 * Main input handler called from HTML buttons
 * This function receives ALL button clicks and routes them to the appropriate handler
 * @param {string} input - The input value from button clicks
 *
 * HINT: This function should:
 * 1. Check if input is a number (0-9) and handle number input
 * 2. Check if input is an operator (+, -, *, /) and handle operator input
 * 3. Check if input is a decimal point (.) and handle decimal input( )
 * 4. Check if input is equals (=) and execute the operation
 * 5. Check if input is clear (C) and reset the calculator
 * 6. Don't forget to call setDisplay() at the end to refresh the screen!
 */
function handleInput(input) {
  console.log(`Button clicked: ${input}`);
  // Your code here
  // Use if statements to check what type of input was received
  // Then call the appropriate helper function
  // you may need to use parseFloat
  // use typeof to check data types
  if (typeof parseFloat(input) == "number") {
    if (firstOperand == null) {
      firstOperand = input;
    }
    handleNumber(input);
  } else {
    return "not working";
  }

  // Don't forget to call setDisplay() at the end!
}

// TODO: Create your arithmetic operation functions here
// You will need: add, subtract, multiply, and divide functions
function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

=======

// Initial Values for holding number/operator or defining if it's a new number or has a decimal already
let firstOperand = null;
let operator = null;
let shouldResetDisplay = 0;
let freshNumber = true;
let decimalInNum = false;

//Main input handler called from HTML buttons - receives ALL button clicks and routes them to the appropriate handler
function handleInput(input) {
  console.log(`Button clicked: ${input}`);
  if (
    input == "1" ||
    input == "2" ||
    input == "3" ||
    input == "4" ||
    input == "5" ||
    input == "6" ||
    input == "7" ||
    input == "8" ||
    input == "9" ||
    input == "0"
  ) {
    handleNumber(input);
    freshNumber = false;
  } else if (input == "+" || input == "-" || input == "*" || input == "/") {
    handleOperator(input);
  } else if (input == "=") {
    executeOperation();
  } else if (input == "C") {
    setDisplay(shouldResetDisplay);
    freshNumber = true;
    decimalInNum = false;
  } else if (input == ".") {
    handleDecimal();
  } else {
    resetCalculator();
  }
}

// Handles arithmetic and rounding
//converts numbers to exact decimals
function numToDec(number) {
  return new Decimal(number).toDP(6).toString();
}
// Arithmetic Functions
function add(num1, num2) {
  return numToDec(new Decimal(num1).plus(num2));
}
function subtract(num1, num2) {
  return numToDec(new Decimal(num1).minus(num2));
}
function multiply(num1, num2) {
  return numToDec(new Decimal(num1).times(num2));
}
>>>>>>> 047484b (Post Calc Project commit)
function divide(num1, num2) {
  if (num2 == 0) {
    return "Error";
  } else {
<<<<<<< HEAD
    return num1 / num2;
  }
}
// Each should take two parameters (first, second) and return the result
// Don't forget to add console.log statements for debugging!
// Remember: division should check for division by zero and return "Error"

/**
 * Handles number input (0-9)
 * @param {string} number - The number that was clicked
 */
function handleNumber(number) {
  // Your code here
  // This function should update the display with setDisplay
  // for example, if we have the number 9 already and are adding another 9
  // Consider: Are we starting fresh? Continuing a number?
  if (number == firstOperand) {
  } else {
    setDisplay(number);
  }
}
/**
 * Handles decimal point input - This is an Optional Stretch
 */
function handleDecimal() {
  // Your code here
  // Make sure you don't add multiple decimal points to one number
}

/**
 * Handles operator input (+, -, *, /)
 * @param {string} nextOperator - The operator that was clicked
 */
function handleOperator(nextOperator) {
  // Your code here
  // Store the operator
  // Store the first number
  // Prepare for the second number input
}

/**
 * Executes the calculation when = is pressed
 */
function executeOperation() {
  // Your code here
  // Use if/else statements to call the right operation function
  // Handle the result and any errors
}

/**
 * Resets the calculator (C button)
 */
function resetCalculator() {
  // Your code here
  // Reset all state variables and display
=======
    return numToDec(new Decimal(num1).dividedBy(num2));
  }
}

// Handles number input (0-9)
function handleNumber(number) {
  if (freshNumber == true) {
    setDisplay(number);
  } else {
    setDisplay(getDisplay() + number);
  }
}

//Handles decimal point input
function handleDecimal() {
  // Sets display correctly if next number leads with a decimal
  if (freshNumber) {
    setDisplay("0.");
  }
  // Sets decimal in display if one doesn't already exist
  if (!freshNumber && !decimalInNum) {
    setDisplay(getDisplay() + ".");
  }
  freshNumber = false;
  decimalInNum = true;
}

//Handles operator input (+, -, *, /)
function handleOperator(nextOperator) {
  // forces execution if a chaining operator
  if (operator != null) {
    executeOperation();
  }
  operator = nextOperator;
  firstOperand = getDisplay();
  freshNumber = true;
  decimalInNum = false;
}

// Executes the calculation (when = is pressed, or a second operator is passed)
function executeOperation() {
  let result = null;
  if (operator == "+") {
    result = add(firstOperand, getDisplay());
  } else if (operator == "-") {
    result = subtract(firstOperand, getDisplay());
  } else if (operator == "*") {
    result = multiply(firstOperand, getDisplay());
  } else if (operator == "/") {
    result = divide(firstOperand, getDisplay());
  }
  setDisplay(result);
  firstOperand = null;
  operator = null;
  freshNumber = true;
}

//Resets the calculator (CE button)
function resetCalculator() {
  // Your code here
  // Reset all state variables and display
  firstOperand = null;
  operator = null;
  decimalInNum = false;
  freshNumber = true;
  setDisplay(shouldResetDisplay);
>>>>>>> 047484b (Post Calc Project commit)
}
