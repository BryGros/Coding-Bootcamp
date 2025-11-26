import { createContext, useContext, useState } from "react";
import { words } from "../data/wordlist.jsx";
import pickRandomWord from "../helper-functions/pickRandomWord.js";
import useWordAPI from "../hooks/useWordAPI.jsx";

export const GameObject = createContext();

export function GameObjectProviders({ children }) {
  // Set random word
  const gameWord = pickRandomWord(words);
  // Fetch Words
  const wordsToFind = useWordAPI(gameWord);

  const [gameObject, setGameObject] = useState({
    gameWord,
    timerColor: "high",
    score: 0,
    difficulty: "normal",
    wordsToFind,
    totalWordsToFind: wordsToFind.length,
    totalWordsFound: 0,
  });

  return (
    <GameObject.Provider value={{ gameObject, setGameObject }}>
      {children}
    </GameObject.Provider>
  );
}
