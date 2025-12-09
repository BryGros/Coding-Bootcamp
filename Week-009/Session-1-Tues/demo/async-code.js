//sync code

//sometimes there are operations we have to wait for, like:
// - user input (console)
// - API calls
// - Disk Operations (write/read to hard-drive)

// We can emulate calling a REST API

// no promise
function getTodaysWeather() {
  setTimeout(() => {
    console.log("Weather is Clear Skies.");
  }, 500);
}

// with promise
function getTomorrowsWeather() {
  const returnValue = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Tomorrow is Rainy! :("), 1000);
  });
}

// Performs in order
console.log(1)
console.log(2); //executes immediately after the above line
console.log(3); //executes immediately after the above line
console.log(4); //executes immediately after the above line
console.log(5); //executes immediately after the above line

// asynch call
getTodaysWeather(); // 
console.log(6)