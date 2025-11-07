// ===================================================================
// DO NOT MODIFY THE CODE BELOW - Call or reference them in your code as needed
// ===================================================================

// Takes in a number and updates the readonly display input
function setDisplay(value) {
  const display = document.getElementById("display");
  // adjusted to handle decimals (parseFloat created issues with displaying leading decimals)
  display.value = String(value);
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
console.log("Initial value of display: ", getDisplay());

// ===================================================================
// DO NOT MODIFY THE CODE Above - Call or reference them in your code as needed
// ===================================================================

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
function divide(num1, num2) {
  if (num2 == 0) {
    return "Error";
  } else {
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
}
