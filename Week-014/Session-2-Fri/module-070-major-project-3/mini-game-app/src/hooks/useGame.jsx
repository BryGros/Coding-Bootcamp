import useWordAPI from "../hooks/useWordAPI.jsx";
import createButtonArray from "../helper-functions/createButtonArray.js";
import { words } from "../data/wordlist.jsx";
import { useContext, useEffect, useState } from "react";
import pickRandomWord from "../helper-functions/pickRandomWord.js";
import { GameObject } from "../context/GameContext.jsx";

export default function useGame() {
  // Bring in game object and create guessWord state
  const { gameObject } = useContext(GameObject);
  const [guessWord, setGuessWord] = useState("");

  // error/succes message states
  const [messageType, setMessageType] = useState("");
  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  // pick a random word and set it for the game
  const newWord = pickRandomWord(words);
  const [gameWord, setGameWord] = useState(newWord);

  // Create Button Array once gameWord is set
  const initArray = createButtonArray(gameWord);
  const [buttonArray, setButtonArray] = useState(initArray);

  // Set score  states
  const [scoreToPass, setScoreToPass] = useState(0);
  const [levelScore, setLevelScore] = useState(0);
  const [levelPassed, setLevelPassed] = useState(false);

  // useEffect to set levelPassed to true if scoreToPass achieved
  useEffect(() => {
    if (scoreToPass != 0) {
      if (levelScore >= scoreToPass) {
        setLevelPassed(true);
      }
    } else {
      return;
    }
  }, [levelScore]);

  // Set word related states, create word list using API, update states when API call is completed
  const [wordsToFind, setWordsToFind] = useState([]);
  const [totalWordsToFind, setTotalWordsToFind] = useState(0);
  const [foundWords, setFoundWords] = useState([]);
  const [totalWordsFound, setTotalWordsFound] = useState(0);
  const wordList = useWordAPI(gameWord);

  // When wordList changes after API call, sync it into the context
  useEffect(() => {
    setWordsToFind(wordList);
    setTotalWordsToFind(wordList.length);
    setScoreToPass(() => {
      let totalScorePossible = 0;
      wordList.forEach((word) => {
        totalScorePossible += word.length;
      });
      const passScore = Math.floor(totalScorePossible / 5);
      return passScore;
    });
  }, [wordList]);

  // ---------- HANDLE WORD SUBMIT ----------
  const handleSubmit = (event) => {
    event.preventDefault();
    // global variables for validation checks
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
      const fullPasscodeList = wordsToFind;
      let wordMatched = false;
      let currIndex = wordsToFind.length;
      while (currIndex-- >= 0) {
        const word = wordsToFind[currIndex];
        if (guessWord == word) {
          wordMatched = true;
          setFoundWords((currlist) => {
            const newWord = [currIndex, guessWord];
            const newFoundList = [...currlist, newWord];
            return newFoundList;
          });
          let addToScore = guessWord.length;
          if (guessWord.length == 5) {
            addToScore += 2;
          } else if (guessWord.length == 6) {
            addToScore += 4;
          } else if (guessWord.length == 7) {
            addToScore += 10;
          }
          setLevelScore((prev) => {
            return prev + addToScore;
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

  // useEffect for resetting showError on change
  useEffect(() => {
    if (!showMsg) {
      return;
    }
    const timeout = setTimeout(() => {
      setShowMsg(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [showMsg]);

  return {
    handleShuffle,
    handleSubmit,
    setGuessWord,
    guessWord,
    foundWords,
    setFoundWords,
    showMsg,
    setShowMsg,
    msg,
    setMsg,
    buttonArray,
    setButtonArray,
    messageType,
    setMessageType,
    gameWord,
    setGameWord,
    wordsToFind,
    scoreToPass,
    levelScore,
    levelPassed,
  };
}
