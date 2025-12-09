import useTimer from "../hooks/useTimer";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { GameObject } from "../context/GameContext";

export default function Timer({ levelPassed, levelScore }) {
  // Bring in GameObject
  const { gameObject, setGameObject } = useContext(GameObject);

  // Set states and variables
  const [timeLeftForColor, setTimeLeftForColor] = useState("high");
  const initTimer = gameObject.timerStart;

  // Hooks to run/set timer and navigation
  const timer = useTimer();
  const navigate = useNavigate();

  // Track if timer hits 0, and adjust timer color when timer changes
  useEffect(() => {
    if (timer == 0) {
      if (levelPassed) {
        setGameObject((prev) => ({
          ...prev,
          continuePlay: true,
        }));
      }
      const initTotalScore = gameObject.totalScore;
      setGameObject((prev) => ({
        ...prev,
        totalScore: initTotalScore + levelScore,
        lastLevelScore: levelScore,
      }));
      navigate("/game-over");
    }
    if (timer < initTimer * 0.25) {
      setTimeLeftForColor("low");
    } else if (timer < initTimer * 0.5) {
      setTimeLeftForColor("medium");
    }
  }, [timer]);

  return (
    <div className="timer">
      Firewall Trace in:{" "}
      <span className={`timer-seconds-${timeLeftForColor}`}>{timer} sec</span>
    </div>
  );
}
