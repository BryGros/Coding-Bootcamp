import Timer from "../components/Timer";
import WordBoard from "../components/WordBoard.jsx";
import LetterButtons from "../components/LetterButtons.jsx";
import { useContext } from "react";
import { ThemeContext } from "../context/PlayerContext.jsx";
import { GameObject } from "../context/GameContext.jsx";
import useGame from "../hooks/useGame.jsx";
import ScoreDisplay from "./ScoreDisplay.jsx";
import { useNavigate } from "react-router";
import LoadingScreen from "./LoadingScreen.jsx";

export default function Gameboard() {
  // Pull from contexts
  const { gameObject, setGameObject } = useContext(GameObject);
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
    wordsToFind,
    scoreToPass,
    levelScore,
    levelPassed,
  } = useGame();

  // Error message vs blank div for maintaining space
  const message = <h1 className={messageType}>{msg}</h1>;
  const messagePlaceholder = <h1 className="msg-placeholder"></h1>;

  const navigate = useNavigate();

  // Handle "Next Level" click
  const handleNextLevelClick = () => {
    // Set totalScore in game context
    const initTotalScore = gameObject.totalScore;
    setGameObject((prev) => ({
      ...prev,
      totalScore: initTotalScore + levelScore,
      lastLevelScore: levelScore,
      continuePlay: true,
    }));

    // Navigate to Game Over page
    navigate("/game-over");
  };

  // Next Level Div
  const nextLvlDiv = (
    <div className="next-level-div">
      <h3>Level Passed!</h3>
      <button id="next-level" onClick={handleNextLevelClick}>
        End Level
      </button>
    </div>
  );

  // Handle clear click
  const handleClear = () => {
    setGuessWord("");
  };

  const gameBoard = (
    <div>
      <div className="board-header">
        {gameObject.difficulty == "Free-Play" ? (
          <div className="intential-blank-div"></div>
        ) : (
          <Timer levelPassed={levelPassed} levelScore={levelScore} />
        )}
        <ScoreDisplay scoreToPass={scoreToPass} levelScore={levelScore} />
      </div>
      <h2>
        {foundWords.length} of {wordsToFind.length} passcodes found
      </h2>
      {levelPassed && nextLvlDiv}
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
      <div className="button-wrap">
        <button type="submit" onClick={handleSubmit} id="submit">
          Submit
        </button>
        <button className="shuffle" onClick={handleShuffle} id="shuffle">
          <i className="fa-solid fa-shuffle"></i>
        </button>
        <button className="clear" onClick={handleClear} id="clear">
          Clear
        </button>
      </div>
      <WordBoard foundWords={foundWords} guessWord={guessWord} />
    </div>
  );

  return (
    <div className="component-wrap">
      {gameObject.wordsLoaded ? gameBoard : <LoadingScreen />}
    </div>
  );
}
