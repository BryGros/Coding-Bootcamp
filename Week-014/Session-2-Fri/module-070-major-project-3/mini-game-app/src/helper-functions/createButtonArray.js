export default function createButtonArray(randomWord) {
  const capWord = randomWord.toUpperCase();
  const buttonArray = capWord.split("");
  return buttonArray;
}
