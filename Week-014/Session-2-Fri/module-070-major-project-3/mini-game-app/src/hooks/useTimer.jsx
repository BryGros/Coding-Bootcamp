import { useEffect, useState, useContext } from "react";
import { GameObject } from "../context/GameContext";

export default function useTimer() {
  // Bring in GameObject
  const { gameObject, setGameObject } = useContext(GameObject);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(60);

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
