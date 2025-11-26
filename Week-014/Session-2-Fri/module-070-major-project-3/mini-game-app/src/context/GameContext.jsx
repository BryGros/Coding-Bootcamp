import { createContext, useContext, useState, useEffect } from "react";
import { words } from "../data/wordlist.jsx";
import pickRandomWord from "../helper-functions/pickRandomWord.js";
import useWordAPI from "../hooks/useWordAPI.jsx";

export const GameObject = createContext();

export function GameObjectProviders({ children }) {
  // Set random word
  const gameWord = pickRandomWord(words);

  const [gameObject, setGameObject] = useState({
    gameWord,
    timerColor: "high",
    score: 0,
    difficulty: "normal",
    wordsToFind: [],
    totalWordsToFind: 0,
    totalWordsFound: 0,
  });

  useEffect(() => {
    setGameObject((prev) => ({
      ...prev,
      wordsToFind,
      totalWordsToFind: wordsToFind.length,
    }));
    console.log(gameObject.totalWordsToFind);
  }, [wordsToFind]);

  return (
    <GameObject.Provider value={{ gameObject, setGameObject }}>
      {children}
    </GameObject.Provider>
  );
}
