import Timer from "../components/Timer";
import useWordAPI from "../hooks/useWordAPI.jsx";
import WordBoard from "../components/WordBoard.jsx";
import LetterButtons from "../components/LetterButtons.jsx";
import createButtonArray from "../helper-functions/createButtonArray.js";
import { words } from "../data/wordlist.jsx";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/PlayerContext.jsx";
import { GameObject } from "../context/GameContext.jsx";
import pickRandomWord from "../helper-functions/pickRandomWord.js";

export default function Gameboard() {
  const { gameObject, setGameObject } = useContext(GameObject);
  const { theme } = useContext(ThemeContext);

  // gameWord state
  const [gameWord, setGameWord] = useState(null);

  // Set random word once on mount
  useEffect(() => {
    const newWord = pickRandomWord(words);
    setGameWord(newWord);
    setGameObject((prev) => ({
      ...prev,
      gameWord: newWord,
    }));
  }, []);

  // Create Button Array once gameWord is set
  useEffect(() => {
    if (!gameWord) return;
    setButtonArray(createButtonArray(gameWord));
  }, [gameWord]);

  // Fetch Words from API when gameWord is set
  const wordList = useWordAPI(gameWord);

  // When wordList changes after API call, sync it into the context
  useEffect(() => {
    setGameObject((prev) => ({
      ...prev,
      wordsToFind: wordList,
      totalWordsToFind: wordList.length,
    }));
  }, [wordList, setGameObject]);

  // Handle submitting a word as a guess
  const handleSubmit = (event) => {
    event.preventDefault();
    // global variables and sets for validation checkes
    let wordAlreadyGuessed = false;
    let repeatedLetter = false;
    setMessageType("error");
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
      }
      repeatedLetter = Object.values(letterCount).some((count) => count > 1);
    };
    // run the above functions to set globals used in validations
    checkMatch(guessWord);
    checkForRepeatLetter(guessWord);
    // validations on guessed word
    if (guessWord.length < 4) {
      setMsg("Passcode too short");
      setShowMsg(true);
    } else if (wordAlreadyGuessed) {
      setMsg("You already cracked that passcode");
      setShowMsg(true);
    } else if (repeatedLetter) {
      setMsg("Passcodes don't have repeated letters");
      setShowMsg(true);
    } else {
      // Push matched words to found word list, or return error
      const fullPasscodeList = gameObject.wordsToFind;
      let wordMatched = false;
      let currIndex = fullPasscodeList.length;
      while (currIndex-- >= 0) {
        const word = fullPasscodeList[currIndex];
        if (guessWord == word) {
          wordMatched = true;
          setFoundWords((currlist) => {
            const newWord = [currIndex, guessWord];
            const newFoundList = [...currlist, newWord];
            return newFoundList;
          });
        }
      }

      if (wordMatched) {
        setMsg("Passcode Cracked!");
        setMessageType("success");
        setShowMsg(true);
      } else {
        setMsg("No passcode found");
        setShowMsg(true);
      }
    }
    setGuessWord("");
  };

  // handle shuffle button click
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
  const [showMsg, setShowMsg] = useState(false);
  const [msg, setMsg] = useState("");
  const [buttonArray, setButtonArray] = useState([]);
  const [messageType, setMessageType] = useState("");

  const message = <h1 className={messageType}>{msg}</h1>;
  const messagePlaceholder = <h1 className="msg-placeholder"></h1>;

  return (
    <div className="component-wrap">
      <Timer />
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
        <i class="fa-solid fa-shuffle"></i>
      </button>
    </div>
  );
}
