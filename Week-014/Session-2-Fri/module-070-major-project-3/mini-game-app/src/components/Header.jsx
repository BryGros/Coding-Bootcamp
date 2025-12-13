import { useContext } from "react";
import { ThemeContext } from "../context/PlayerContext";
import { Link } from "react-router";

export default function Header() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="header-wrap">
      <h1 className={`themed-text theme-${theme}`}>Code-Cracker</h1>
      <div className="link-wrap">
        <Link to="/Coding-Bootcamp/code-cracker/">Home</Link>
        <Link to="/Coding-Bootcamp/code-cracker/play">Play</Link>
        <Link to="/Coding-Bootcamp/code-cracker/preferences">Preferences</Link>
        <Link to="/Coding-Bootcamp/code-cracker/leaderboard">Leaderboard</Link>
      </div>
    </div>
  );
}
