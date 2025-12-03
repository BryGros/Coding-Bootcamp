import useTimer from "../hooks/useTimer";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { GameObject } from "../context/GameContext";

export default function Timer() {
  // Bring in GameObject
  const { gameObject, setGameObject } = useContext(GameObject);
  // Set variables
  const timerColor = gameObject.timerColor;
  const initTimer = gameObject.timerStart;
  // Hooks to run/set timer and navigation
  const timer = useTimer();
  const navigate = useNavigate();
  // Every time timer changes, checks time left and adjusts timerColor or navigates to game-over if timer is 0
  useEffect(() => {
    if (timer == 0) {
      navigate("/game-over");
    }
    if (timer < initTimer * 0.25) {
      setGameObject(() => {
        const newObject = { ...gameObject };
        newObject.timerColor = "low";
        return newObject;
      });
    } else if (timer < initTimer * 0.5) {
      setGameObject(() => {
        const newObject = { ...gameObject };
        newObject.timerColor = "medium";
        return newObject;
      });
    }
  }, [timer]);

  return (
    <div className="timer">
      Firewall Trace in:{" "}
      <span className={`timer-seconds-${timerColor}`}>{timer} sec</span>
    </div>
  );
}
