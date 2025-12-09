import { Link } from "react-router";

export default function GameOver() {
  const playAgainPath = "/play";
  return (
    <div className="component-wrap">
      <h1>GAME OVER</h1>
      <Link className="play-again-btn" to={playAgainPath}>Play Again</Link>
    </div>
  );
}
