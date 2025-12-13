import { useNavigate } from "react-router";
import { GameObject } from "../context/GameContext";
import { useContext } from "react";
import Leaderboard from "../components/LeaderBoard";
import { PlayerNameContext, ThemeContext } from "../context/PlayerContext";
import createLeaderBoard from "../helper-functions/createLeaderBoard";

export default function GameOver() {
  const navigate = useNavigate();
  const { gameObject, setGameObject } = useContext(GameObject);
  const { theme } = useContext(ThemeContext);
  const { playerName } = useContext(PlayerNameContext);

  const handleClick = () => {
    navigate("/Coding-Bootcamp/code-cracker/play");
  };

  const handleGameEnd = () => {
    const id = Date.now().toString();
    const newGameObject = {
      id,
      playerName: playerName,
      score: gameObject.totalScore,
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
      continuePlay: false,
    }));
  };

  const lastLevelScore = <h2>Last level score: {gameObject.lastLevelScore}</h2>;

  return (
    <div className="component-wrap">
      {/* Dynamic displaying based on if they navigated to this page manually */}
      {gameObject.totalScore != 0 ? (
        <h1>
          {gameObject.continuePlay ? "LEVEL COMPLETE - GREAT JOB" : "GAME OVER"}
        </h1>
      ) : (
        <h1>Wait... why'd you come here?</h1>
      )}
      {gameObject.continuePlay && lastLevelScore}
      {/* Dynamic displaying based on if they navigated to this page manually */}
      {gameObject.totalScore != 0 ? (
        <h3>
          Total Score:{" "}
          <span className={`themed-text theme-${theme}`}>
            {gameObject.totalScore}
          </span>
        </h3>
      ) : (
        ""
      )}
      <div className="btn-wrap">
        <button className="play-again-btn" onClick={handleClick}>
          {gameObject.continuePlay ? "PLAY NEXT LEVEL" : "START A NEW GAME"}
        </button>
        {gameObject.continuePlay && (
          <button onClick={handleGameEnd}>END RUN</button>
        )}
      </div>
      {!gameObject.continuePlay && <Leaderboard />}
    </div>
  );
}
