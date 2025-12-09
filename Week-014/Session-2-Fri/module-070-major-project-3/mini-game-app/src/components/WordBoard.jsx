export default function WordBoard({ foundWords }) {
  const wordListRender = foundWords.map((wordArray) => {
    const wordKey = wordArray[0];
    const word = wordArray[1];
    return (
      <li className="found-word" id={wordKey}>
        {word}
      </li>
    );
  });

  return (
    <div className="word-list-wrap">
      <h1>Cracked Passcodes:</h1>
      <ul className="found-word-list">{wordListRender}</ul>
    </div>
  );
}
