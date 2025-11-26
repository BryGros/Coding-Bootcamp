import Timer from "../components/Timer";
import useWordAPI from "../hooks/useWordAPI.jsx";
import WordBoard from "../components/WordBoard.jsx";
import LetterButtons from "../components/LetterButtons.jsx";
import createButtonArray from "../helper-functions/createButtonArray.js";
import { words } from "../data/wordlist.jsx";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/PlayerContext.jsx";
import { GameObject } from "../context/GameContext.jsx";

export default function Gameboard() {
  const { gameObject } = useContext(GameObject);
  const { setGameObject } = useContext(GameObject);
  const gameWord = gameObject.gameWord;
  // Fetch Words
  const wordList = useWordAPI(gameWord);
  setGameObject((prev) => ({
    ...prev,
    wordsToFind: wordList,
  }));

  // Submit a word as a guess
  const handleSubmit = (event) => {
    event.preventDefault();
    // global variables for validation checkes
    let wordAlreadyGuessed = false;
    let repeatedLetter = false;
    // function that sets wordAlreadyGuessed to true if guessWord was already found
    const checkMatch = (guessWord) => {
      for (const index in foundWords) {
        const wordArrayItem = foundWords[index];
        const foundWord = wordArrayItem[1];
        if (foundWord == guessWord) {
          wordAlreadyGuessed = true;
        }
      }
    };
    // function to check for repeated letters
    const checkForRepeatLetter = (guessWord) => {
      repeatedLetter = false;
      let letterCount = {};
      for (let i = 0; i < guessWord.length; i++) {
        let letter = guessWord[i];
        letterCount[letter] = (letterCount[letter] || 0) + 1;
        console.log(letterCount);
      }
      repeatedLetter = Object.values(letterCount).some((count) => count > 1);
    };
    // run the above functions to set globals used in validations
    checkMatch(guessWord);
    checkForRepeatLetter(guessWord);
    // validations on guessed word
    if (guessWord.length < 4) {
      setErrMsg("Passcode too short");
      setShowError(true);
    } else if (wordAlreadyGuessed) {
      setErrMsg("You already cracked that passcode");
      setShowError(true);
    } else if (repeatedLetter) {
      setErrMsg("Passcodes don't have repeated letters");
      setShowError(true);
    } else {
      for (const index in fullPasscodeList) {
        const word = fullPasscodeList[index];
        if (guessWord == word) {
          setFoundWords((currlist) => {
            const newWord = [index, guessWord];
            const newFoundList = [...currlist, newWord];
            return newFoundList;
          });
          setShowWordFound(true);
        } else {
          setErrMsg("No passcode found");
          setShowError(true);
        }
      }
    }
    setGuessWord("");
  };
  const initBtnArray = createButtonArray(randomWord);

  const handleShuffle = () => {
    let workingArray = [...buttonArray];
    let currIndex = workingArray.length;
    let temp;
    let randomIndex;

    while (currIndex-- > 0) {
      randomIndex = Math.floor(Math.random() * (currIndex + 1));
      temp = workingArray[randomIndex];
      workingArray[randomIndex] = workingArray[currIndex];
      workingArray[currIndex] = temp;
    }
    setButtonArray(workingArray);
  };

  const [guessWord, setGuessWord] = useState("");
  const [foundWords, setFoundWords] = useState([]);
  const [showError, setShowError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [showWordFound, setShowWordFound] = useState(false);
  const [buttonArray, setButtonArray] = useState(initBtnArray);
  const { theme } = useContext(ThemeContext);

  const errorMessage = <h1 className="error">{errMsg}</h1>;
  const messagePlaceholder = <h1 className="msg-placeholder"></h1>;

  return (
    <div className="component-wrap">
      <Timer />
      <WordBoard foundWords={foundWords} guessWord={guessWord} />
      {showError ? errorMessage : messagePlaceholder}
      <h1>Passcode:</h1>
      <h2 className="guessWord">
        {guessWord}
        <span className={`blinking-cursor theme-${theme}`}>|</span>
      </h2>
      <LetterButtons
        buttonArray={buttonArray}
        setShowError={setShowError}
        setShowWordFound={setShowWordFound}
        setGuessWord={setGuessWord}
      />
      <button type="submit" onClick={handleSubmit}>
        Check Passcode
      </button>
      <button className="shuffle" onClick={handleShuffle}>
        Shuffle Letters
      </button>
      <div className="word-found">
        {showWordFound ? (
          <h1 className="found-word-msg">Passcode Cracked!</h1>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
