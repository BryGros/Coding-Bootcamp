import { createContext, useState, useEffect } from "react";

export const GameObject = createContext();

export function GameObjectProviders({ children }) {
  const initializeData = () => {
    const localStorageData = localStorage.getItem("gameObject");
    if (localStorageData == null) {
      return {
        totalScore: 0,
        difficulty: "Hard",
        timerStart: 60,
        lastLevelScore: 0,
        lastGameId: "",
        continuePlay: false,
        apiKey: "",
        leaderBoard: [],
      };
    } else {
      return JSON.parse(localStorageData);
    }
  };
  const [gameObject, setGameObject] = useState(initializeData);

  // Any time gameObject changes, push update to localStorage
  useEffect(() => {
    localStorage.setItem("gameObject", JSON.stringify(gameObject));
  }, [gameObject]);

  return (
    <GameObject.Provider value={{ gameObject, setGameObject }}>
      {children}
    </GameObject.Provider>
  );
}
