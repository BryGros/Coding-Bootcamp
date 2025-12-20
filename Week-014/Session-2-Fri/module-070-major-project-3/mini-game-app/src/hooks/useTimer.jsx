import { useEffect, useState, useContext } from "react";
import { GameObject } from "../context/GameContext";

export default function useTimer() {
  // Bring in GameObject
  const { gameObject, setGameObject } = useContext(GameObject);

  // Initialize Timer based on difficulty
  const timerInit = () => {
    const diff = gameObject.difficulty;
    if (diff == "Hard") {
      return 60;
    } else {
      return 90;
    }
  };

  // Timer state
  const [timeLeft, setTimeLeft] = useState(timerInit());

  // Every second, setTimeLeft down one number until it hits 0 (unless freeplay)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((curr) => {
        const difficulty = gameObject.difficulty;
        if (curr <= 0) {
          return 0;
        } else if (difficulty == "freeplay") {
          return;
        } else {
          return curr - 1;
        }
      });
    }, 1000);

    // When dismounting (during navigation), clean up
    return () => {
      clearInterval(timer);
    };
  }, []);

  return timeLeft;
}
