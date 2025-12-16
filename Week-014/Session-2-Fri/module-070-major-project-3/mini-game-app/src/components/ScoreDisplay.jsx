import { useContext } from "react";
import { ThemeContext } from "../context/PlayerContext";

export default function ScoreDisplay({ scoreToPass, levelScore }) {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="scores">
      <h2>
        <span className={`themed-text theme-${theme}`}>Level Score:</span>{" "}
        <span className="animate-text">{levelScore}</span>
      </h2>
      <h2>
        <span className={`themed-text theme-${theme}`}>Score to Pass:</span>{" "}
        {scoreToPass}
      </h2>
    </div>
  );
}
