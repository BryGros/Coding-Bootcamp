import { useContext } from "react";
import { PlayerNameContext, ThemeContext } from "../context/PlayerContext";
import { GameObject } from "../context/GameContext";
import { Link } from "react-router";

export default function Header() {
  const { theme } = useContext(ThemeContext);
  const { playerName } = useContext(PlayerNameContext);
  const { gameObject } = useContext(GameObject);

  return (
    <div className="header-wrap">
      <h1 className={`themed-text theme-${theme}`}>Code-Cracker</h1>
      <div className="link-wrap">
        <Link to="/">Home</Link>
        <Link to="/play">Play</Link>
        <Link to="/preferences">Preferences</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </div>
    </div>
  );
}
