import { useState } from "react";
import Timer from "../components/Timer";
import generateWordsJson from "../helper-functions/generateWordsJson.jsx";
import WordBoard from "../components/WordBoard.jsx";
import LetterButtons from "../components/LetterButtons.jsx";
import createButtonArray from "../helper-functions/createButtonArray.js";
import { words } from "../data/wordlist.jsx";

export default function Game() {
  const randomIndex = Math.floor(Math.random() * (words.length + 1));
  const randomWord = words[randomIndex];
  const gameWord = randomWord;
  console.log(randomIndex);

  const sampleJson = {
    results: 101,
    found_words: {
      2: [
        "QI",
        "UN",
        "NU",
        "NA",
        "AT",
        "TI",
        "EA",
        "NE",
        "AI",
        "AN",
        "ET",
        "TE",
        "UT",
        "EN",
        "AE",
        "TA",
        "IN",
        "IT",
      ],
      3: [
        "QAT",
        "QUA",
        "QIN",
        "UNI",
        "NUT",
        "TAU",
        "AIN",
        "EAU",
        "AIT",
        "TEN",
        "NAT",
        "EAT",
        "TIN",
        "TAI",
        "NIT",
        "NET",
        "EAN",
        "TAE",
        "TUI",
        "ITA",
        "ETA",
        "UTE",
        "TAN",
        "AUE",
        "NAE",
        "TUN",
        "TIE",
        "UTA",
        "NIE",
        "TEA",
        "ANI",
        "ANE",
        "ATE",
        "ANT",
      ],
      4: [
        "QUAT",
        "QUIN",
        "QUIT",
        "QUAI",
        "ANTE",
        "AUNT",
        "TEIN",
        "ETUI",
        "AUNE",
        "AITU",
        "NEAT",
        "TINE",
        "UNIT",
        "TUNE",
        "TIAN",
        "UNAI",
        "TANE",
        "ANTI",
        "TINA",
        "TUAN",
        "ETNA",
        "TAIN",
        "EINA",
        "AINE",
        "TUNA",
        "NITE",
        "EEEE",
      ],
      5: [
        "QUINA",
        "QUIET",
        "QUENA",
        "QUITE",
        "QUINT",
        "QUEAN",
        "QUATE",
        "QUANT",
        "QUINE",
        "UNTIE",
        "TUINA",
        "ENTIA",
        "UNITE",
        "TENIA",
        "TINEA",
      ],
      6: ["QUINTE", "EQUANT", "QUINTA", "QUAINT", "QUEINT", "AUNTIE"],
      7: ["QUINATE", "ANTIQUE"],
    },
  };

  const wordsJson = sampleJson; // change later to generateWordsJson("Antique");

  const results = wordsJson.found_words;

  let fullPasscodeList = [];

  // Pushing possible words from API to fullPassocdeList
  for (const i in results) {
    if (Number(i) > 3) {
      const wordsArray = results[i];
      wordsArray.forEach((element) => {
        fullPasscodeList.push(element);
      });
    }
  }

  // Submit a word as a guess
  const handleSubmit = (event) => {
    event.preventDefault();
    // variable for if a word is already guessed
    let wordMatched = false;

    // function that sets wordMatched to true if guessWord was already found
    const checkMatch = (guessWord) => {
      for (const index in foundWords) {
        const wordArrayItem = foundWords[index];
        const foundWord = wordArrayItem[1];
        if (foundWord == guessWord) {
          wordMatched = true;
        }
      }
    };
    // run the above function
    checkMatch(guessWord);
    let repeatedLetter = false;

    // function to check for repeated letters
    const checkForRepeatLetter = (guessWord) => {
      repeatedLetter = false;
      let letterCount = {};
      for (let i = 0; i < guessWord.length; i++) {
        let letter = guessWord[i];
        letterCount[letter] = (letterCount[letter] || 0) + 1;
      }
      repeatedLetter = Object.values(letterCount).some(
        (letterCount) => letterCount > 1
      );
    };
    // run the above function
    checkForRepeatLetter(guessWord);

    // validations on guessed word
    if (guessWord.length < 4) {
      setErrMsg("Attempted passcodes should be at least 4 letters long");
      setShowError(true);
    } else if (wordMatched) {
      setErrMsg("You already cracked that passcode!");
      setShowError(true);
    } else if (repeatedLetter) {
      setErrMsg("Passcodes don't have repeated letters!");
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
  const initBtnArray = createButtonArray(gameWord);

  const handleShuffle = () => {
    setButtonArray(createButtonArray(gameWord));
  };

  const [guessWord, setGuessWord] = useState("");
  const [foundWords, setFoundWords] = useState([]);
  const [showError, setShowError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [showWordFound, setShowWordFound] = useState(false);
  const [buttonArray, setButtonArray] = useState(initBtnArray);

  return (
    <div className="game-wrapper">
      <Timer />
      <h1 className="error">{showError ? errMsg : ""}</h1>
      <h1>
        Passcode: <span className="guessWord">{guessWord}</span>
      </h1>
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
      <WordBoard foundWords={foundWords} guessWord={guessWord} />
    </div>
  );
}
