import useTimer from "../hooks/useTimer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Timer() {
  const timer = useTimer();
  const navigate = useNavigate();
  useEffect(() => {
    if (timer == 0) {
      navigate("/game-over");
    }
  }, [timer]);

  useNavigate("/game-over");

  return (
    <div className="timer">
      Firewall Trace in: <span className="timer-seconds">{timer} sec</span>
    </div>
  );
}
