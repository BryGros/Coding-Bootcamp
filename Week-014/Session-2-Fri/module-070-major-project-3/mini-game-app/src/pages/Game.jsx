import { useState } from "react";
import Timer from "../components/Timer";
import generateWordsJson from "../helper-functions/generateWordsJson.jsx";

export default function Game() {
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
  let wordlist = [];
  for (const i in results) {
    if (Number(i) > 3) {
      const wordsArray = results[i];
      wordsArray.forEach((element) => {
        wordlist.push(element);
      });
    }
  }
  console.log(wordlist);

  const handleLetterClick = (event) => {
    setShowError(false);
    const letterClicked = event.target.value;
    setGuessWord((prev) => prev + letterClicked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    for (const word in wordlist) {
      if (guessWord.length < 4) {
        setErrMsg("Word not long enough");
        setShowError(true);
        setGuessWord("");
        return;
      }
    }
  };
  const [guessWord, setGuessWord] = useState("");
  const [foundWords, setFoundWords] = useState(["EE"]);
  const [showError, setShowError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  return (
    <div className="game-wrapper">
      <Timer />
      <h1>{showError ? errMsg : ""}</h1>
      <h1>
        Word: <span className="guessWord">{guessWord}</span>
      </h1>
      <button value="E" onClick={handleLetterClick}>
        E
      </button>
      <button type="submit" onClick={handleSubmit}>
        Commit Word
      </button>
    </div>
  );
}
