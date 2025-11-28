import { useContext, useEffect, useState } from "react";
import {
  PlayerExists,
  PlayerNameContext,
  ThemeContext,
} from "../context/PlayerContext";
import { GameObject } from "../context/GameContext";

export default function UserPreferences() {
  const { playerName, setPlayerName } = useContext(PlayerNameContext);
  const { setPlayerExists } = useContext(PlayerExists);
  const { theme, setTheme } = useContext(ThemeContext);
  const { gameObject, setGameObject } = useContext(GameObject);
  const initDiff = gameObject.difficulty;

  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [selDifficulty, setSelDifficulty] = useState(initDiff);
  const [editName, setEditName] = useState(false);

  const handleNameChange = () => {
    setEditName(false);
  };

  const handleEditNameClick = () => {
    setEditName(true);
  };

  const handleThemeChange = (event) => {
    const clickedTheme = event.target.value;
    setSelectedTheme(clickedTheme);
  };

  const handlePlayClick = (event) => {
    event.preventDefault();
    setGameObject((prev) => {
      const newObject = { ...prev };
      newObject.difficulty = selDifficulty;
      newObject.timerColor = "high";
      return newObject;
    });
    setPlayerExists(true);
  };

  const editFields = (
    <div className="edit-field-wrap">
      <label htmlFor={`player-name theme-${theme}`}>Player Name:</label>
      <input
        type="text"
        id="player-name"
        value={playerName}
        onChange={(e) => {
          setPlayerName(e.target.value);
        }}
      />
      <button type="submit" onClick={handleNameChange}>
        Save
      </button>
    </div>
  );

  const displayFields = (
    <div className="display-field-wrap">
      <label htmlFor={`player-name theme-${theme}`}>Player Name:</label>
      <h2>{playerName == "" ? "Not Set" : playerName}</h2>
      <button onClick={handleEditNameClick}>
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
    </div>
  );

  useEffect(() => {
    setTheme(selectedTheme);
    setGameObject((prev) => {
      const newObject = { ...prev };
      newObject.difficulty = selDifficulty;
      return newObject;
    });
  }, [selectedTheme, selDifficulty]);

  return (
    <div className={`component-wrap theme-${theme}`}>
      {editName ? editFields : displayFields}
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
      <h2>Difficulty:</h2>
      <div className="difficulty-wrap">
        <button className="normal-diff">Normal</button>
        <button className="hard-diff">Hard</button>
        <button className="freeplay">Free Play</button>
      </div>
      <button className="play-button" type="submit" onClick={handlePlayClick}>
        Play!
      </button>
    </div>
  );
}
