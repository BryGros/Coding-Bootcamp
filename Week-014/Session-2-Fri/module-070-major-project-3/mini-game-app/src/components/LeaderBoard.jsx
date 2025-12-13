import { useContext } from "react";
import { GameObject } from "../context/GameContext";
import { ThemeContext } from "../context/PlayerContext";

export default function Leaderboard() {
  const { gameObject } = useContext(GameObject);
  const { theme } = useContext(ThemeContext);
  const leaderboard = gameObject.leaderBoard;
  const lastGameId = gameObject.lastGameId;

  return (
    <div className="leaderboard-wrap">
      <h1>Leader Board</h1>
      <ol>
        {leaderboard.map((game) => {
          return (
            <li
              key={game.id}
              className={
                lastGameId == game.id
                  ? `last-game theme-${theme}`
                  : `old-game ${theme}`
              }
            >
              {game.playerName} - {game.score} - Difficulty: {game.difficulty}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
