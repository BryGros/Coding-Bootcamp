import useTimer from "../hooks/useTimer";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { GameObject } from "../context/GameContext";
import { PlayerNameContext } from "../context/PlayerContext";
import createLeaderBoard from "../helper-functions/createLeaderBoard";

export default function Timer({ levelPassed, levelScore }) {
  // Bring in GameObject
  const { gameObject, setGameObject } = useContext(GameObject);
  const { playerName } = useContext(PlayerNameContext);

  // Set states and variables
  const [timeLeftForColor, setTimeLeftForColor] = useState("high");
  const initTimer = gameObject.timerStart;

  // Hooks to run/set timer and navigation
  const timer = useTimer();
  const navigate = useNavigate();

  // Track if timer hits 0, and adjust timer color when timer changes
  useEffect(() => {
    if (timer == 0) {
      // Add Level Score to total score and set lastLevelScore
      const initTotalScore = gameObject.totalScore;
      setGameObject((prev) => ({
        ...prev,
        totalScore: initTotalScore + levelScore,
        lastLevelScore: levelScore,
      }));
      // Update continuePlay if level passed
      if (levelPassed) {
        setGameObject((prev) => ({
          ...prev,
          continuePlay: true,
        }));
      } else {
        // If level not passed, generate new leaderboard using previous board and last game
        const id = Date.now().toString();
        const newGameObject = {
          id,
          playerName: playerName,
          score: gameObject.totalScore + levelScore,
          difficulty: gameObject.difficulty,
        };
        const newLeaderBoard = createLeaderBoard(
          gameObject.leaderBoard,
          newGameObject
        );
        setGameObject((prev) => ({
          ...prev,
          leaderBoard: newLeaderBoard,
          lastGameId: id,
        }));
      }
      // Navigate to Game Over page
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
