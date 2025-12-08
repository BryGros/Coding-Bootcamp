import Timer from "../components/Timer";
import WordBoard from "../components/WordBoard.jsx";
import LetterButtons from "../components/LetterButtons.jsx";
import { useContext } from "react";
import { ThemeContext } from "../context/PlayerContext.jsx";
import { GameObject } from "../context/GameContext.jsx";
import useGame from "../hooks/useGame.jsx";

export default function Gameboard() {
  // Pull from contexts
  const { gameObject } = useContext(GameObject);
  const { theme } = useContext(ThemeContext);

  // Pull functionality from useGame Hook
  const {
    handleShuffle,
    handleSubmit,
    setGuessWord,
    guessWord,
    foundWords,
    showMsg,
    setShowMsg,
    msg,
    buttonArray,
    messageType,
  } = useGame();

  // Error message vs blank div for maintaining space
  const message = <h1 className={messageType}>{msg}</h1>;
  const messagePlaceholder = <h1 className="msg-placeholder"></h1>;

  return (
    <div className="component-wrap">
      {gameObject.difficulty == "Free-Play" ? <div></div> : <Timer />}
      <WordBoard foundWords={foundWords} guessWord={guessWord} />
      {showMsg ? message : messagePlaceholder}
      <h1>Passcode:</h1>
      <h2 className="guessWord">
        {guessWord}
        <span className={`blinking-cursor theme-${theme}`}>|</span>
      </h2>
      <LetterButtons
        buttonArray={buttonArray}
        setShowMsg={setShowMsg}
        setGuessWord={setGuessWord}
      />
      <button type="submit" onClick={handleSubmit}>
        Check Passcode
      </button>
      <button className="shuffle" onClick={handleShuffle}>
        <i className="fa-solid fa-shuffle"></i>
      </button>
    </div>
  );
}
