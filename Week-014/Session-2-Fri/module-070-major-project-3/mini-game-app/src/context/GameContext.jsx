import { createContext, useState } from "react";

export const GameObject = createContext();

export function GameObjectProviders({ children }) {
  const [gameObject, setGameObject] = useState({
    totalScore: 0,
    difficulty: "Hard",
    timerStart: 60,
    apiKey: "",
  });

  return (
    <GameObject.Provider value={{ gameObject, setGameObject }}>
      {children}
    </GameObject.Provider>
  );
}
