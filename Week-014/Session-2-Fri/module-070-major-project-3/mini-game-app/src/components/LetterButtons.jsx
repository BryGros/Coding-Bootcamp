import { useContext } from "react";
import { ThemeContext } from "../context/PlayerContext";

export default function LetterButtons({
  buttonArray,
  setShowError,
  setShowWordFound,
  setGuessWord,
}) {
  const { theme } = useContext(ThemeContext);
  const handleLetterClick = (event) => {
    setShowError(false);
    setShowWordFound(false);
    const letterClicked = event.target.value;
    setGuessWord((prev) => prev + letterClicked);
  };
  return (
    <div className="letter-button-wrap">
      {buttonArray.map((letter, index) => {
        return (
          <button
            className={`letter-button-${index + 1} theme-${theme}`}
            value={letter}
            key={letter}
            onClick={handleLetterClick}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}
