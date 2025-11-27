import { useContext, useEffect, useState } from "react";
import {
  PlayerExists,
  PlayerNameContext,
  ThemeContext,
} from "../context/PlayerContext";

export default function UserPreferences() {
  const { playerName, setPlayerName } = useContext(PlayerNameContext);
  const { setPlayerExists } = useContext(PlayerExists);
  const { theme, setTheme } = useContext(ThemeContext);

  const [selectedTheme, setSelectedTheme] = useState(theme);

  const handleNameChange = (event) => {
    event.preventDefault();
    setPlayerExists(true);
  };

  const handleThemeChange = (event) => {
    const clickedTheme = event.target.value;
    setSelectedTheme(clickedTheme);
  };

  useEffect(() => {
    setTheme(selectedTheme);
  }, [selectedTheme]);

  return (
    <div className="component-wrap">
      <label htmlFor="player-name">Player Name</label>
      <input
        type="text"
        id="player-name"
        value={playerName}
        onChange={(e) => {
          setPlayerName(e.target.value);
        }}
      />
      <button type="submit" onClick={handleNameChange}>
        Save Name
      </button>
      <h2>Themes:</h2>
      <div className="theme-list">
        <button
          value="default"
          className="selector-theme-default"
          onClick={handleThemeChange}
        >
          Default
        </button>
        <button
          value="red"
          className="selector-theme-red"
          onClick={handleThemeChange}
        >
          Moody Red
        </button>
        <button
          value="yellow"
          className="selector-theme-yellow"
          onClick={handleThemeChange}
        >
          Lightning
        </button>
      </div>
    </div>
  );
}
