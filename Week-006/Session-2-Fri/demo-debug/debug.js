let raceNumber = Math.floor(Math.random() * 1000);
console.log(raceNumber);
registeredEarly = true;
runnerAge = 17;
const isRunnerAdult = runnerAge >= 18;
const isEligible = registeredEarly && isRunnerAdult;
if (isEligible) {
  console.log((raceNumber += 1000));
} else {
  raceNumber;
}
if (registeredEarly && runnerAge > 18) {
  console.log(
    `Your race time is 9:30 am.  Your race number is: ${raceNumber}.`
  );
} else if (!registeredEarly && runnerAge > 18) {
  console.log(
    `Your race time is 11:00 am.  Your race number is: ${raceNumber}.`
  );
} else if (runnerAge < 18) {
  console.log(
    `Your race time will start at 12:30pm.  Your race number is: ${raceNumber}.`
  );
} else if (runnerAge === 18) {
  console.log("Check the front desk.");
}
