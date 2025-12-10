import { useContext } from "react";
import { ThemeContext } from "../context/PlayerContext";

export default function WordBoard({ foundWords }) {
  const {theme} = useContext(ThemeContext)
  let wordKey = 0;
  const wordListRender = foundWords.map((wordArray) => {
    wordKey++;
    const word = wordArray[1];
    return (
      <li className={`found-word themed-text theme-${theme}`} key={wordKey}>
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
