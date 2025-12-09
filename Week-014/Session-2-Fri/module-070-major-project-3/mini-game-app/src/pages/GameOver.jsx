import { Link, useNavigate } from "react-router";
import { GameObject } from "../context/GameContext";
import { useContext } from "react";
import LeaderBoardPage from "./LeaderBoardPage";
import Leaderboard from "../components/LeaderBoard";

export default function GameOver() {
  const navigate = useNavigate();
  const { gameObject, setGameObject } = useContext(GameObject);

  const handleClick = () => {
    if (gameObject.continuePlay) {
      setGameObject((prev) => ({
        ...prev,
        continuePlay: false,
      }));
    } else {
      setGameObject((prev) => ({
        ...prev,
        totalScore: 0,
      }));
    }
    navigate("/play");
  };

  const lastLevelScore = <h2>Last level score: {gameObject.lastLevelScore}</h2>;

  return (
    <div className="component-wrap">
      <h1>{gameObject.continuePlay ? "LEVEL COMPLETE" : "GAME OVER"}</h1>
      {gameObject.continuePlay && lastLevelScore}
      <h3>Total Score: {gameObject.totalScore}</h3>
      <button className="play-again-btn" onClick={handleClick}>
        {gameObject.continuePlay ? "PLAY NEXT LEVEL" : "START A NEW GAME"}
      </button>
      {!gameObject.continuePlay && <Leaderboard />}
    </div>
  );
}
