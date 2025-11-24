export default function createButtonArray(gameWord) {
  // Capitalize the letters
  const capWord = gameWord.toUpperCase();
  // Create an array that contains each letter
  const buttonArray = capWord.split("");
  // Shuffle letters using Fisher-Yates algorithm
  let currIndex = buttonArray.length;
  let temp;
  let randomIndex;
  while (currIndex-- > 0) {
    randomIndex = Math.floor(Math.random() * (currIndex + 1));
    temp = buttonArray[randomIndex];
    buttonArray[randomIndex] = buttonArray[currIndex];
    buttonArray[currIndex] = temp;
  }

  return buttonArray;
}
