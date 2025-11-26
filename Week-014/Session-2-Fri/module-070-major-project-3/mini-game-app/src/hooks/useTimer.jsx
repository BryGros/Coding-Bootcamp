import { useEffect, useState, useContext } from "react";
import { GameObject } from "../context/GameContext";

export default function useTimer() {
  const [timeLeft, setTimeLeft] = useState(60);
  const { setGameObject } = useContext(GameObject);

  useEffect(() => {
    const initTimer = timeLeft;
    const timer = setInterval(() => {
      setTimeLeft((curr) => {
        if (curr <= 0) {
          return 0;
        } else {
          return curr - 1;
        }
      });
      if (timeLeft < initTimer * 0.25) {
        setGameObject(() => {
          const newObject = { ...gameObject };
          newObject.timerColor = "low";
          return newObject;
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return timeLeft;
}
