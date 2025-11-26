export default function pickRandomWord(words) {
  const randomIndex = Math.floor(Math.random() * (words.length + 1));
  const randomWord = words[randomIndex];
  return randomWord;
}
