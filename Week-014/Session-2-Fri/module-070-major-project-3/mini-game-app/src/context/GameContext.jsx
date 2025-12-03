import { createContext, useContext, useState, useEffect } from "react";

export const GameObject = createContext();

export function GameObjectProviders({ children }) {

  const [gameObject, setGameObject] = useState({
    gameWord: "",
    timerColor: "high",
    score: 0,
    difficulty: "hard",
    timerStart: 60,
    minScore: 100,
    wordsToFind: [],
    totalWordsToFind: 0,
    totalWordsFound: 0,
  });

  return (
    <GameObject.Provider value={{ gameObject, setGameObject }}>
      {children}
    </GameObject.Provider>
  );
}
