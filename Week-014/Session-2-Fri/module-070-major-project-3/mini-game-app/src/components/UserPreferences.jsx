import { useContext, useEffect, useState } from "react";
import {
  PlayerDataExists,
  PlayerNameContext,
  ThemeContext,
} from "../context/PlayerContext";
import { GameObject } from "../context/GameContext";

export default function UserPreferences() {
  const { playerName, setPlayerName } = useContext(PlayerNameContext);
  const { setPlayerDataExists } = useContext(PlayerDataExists);
  const { theme, setTheme } = useContext(ThemeContext);
  const { gameObject, setGameObject } = useContext(GameObject);

  const [editName, setEditName] = useState(false);

  const handleNameChange = () => {
    setEditName(false);
  };

  const handleEditNameClick = () => {
    setEditName(true);
  };

  const handleDiffSelect = (event) => {
    setGameObject((prev) => ({
      ...prev,
      difficulty: event.target.value,
    }));
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const handlePlayClick = (event) => {
    event.preventDefault();
    setPlayerDataExists(true);
  };

  const handleApiKeyChange = (event) => {
    setGameObject((prev) => ({
      ...prev,
      apiKey: event.target.value,
    }));
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
        <i className="fa-regular fa-pen-to-square"></i>
      </button>
    </div>
  );

  return (
    <div className={`component-wrap theme-${theme}`}>
      {editName ? editFields : displayFields}
      <h2>Theme: {theme}</h2>
      <div className="theme-list">
        <button
          value="Default"
          className="selector-theme-default"
          onClick={handleThemeChange}
        >
          Default
        </button>
        <button
          value="Red"
          className="selector-theme-red"
          onClick={handleThemeChange}
        >
          Moody Red
        </button>
        <button
          value="Yellow"
          className="selector-theme-yellow"
          onClick={handleThemeChange}
        >
          Lightning
        </button>
      </div>
      <h2>Difficulty: {gameObject.difficulty}</h2>
      <div className="difficulty-wrap">
        <button
          className="normal-diff"
          value="Normal"
          onClick={handleDiffSelect}
        >
          Normal
        </button>
        <button className="hard-diff" value="Hard" onClick={handleDiffSelect}>
          Hard
        </button>
        <button
          className="freeplay"
          value="Free-Play"
          onClick={handleDiffSelect}
        >
          Free-Play
        </button>
      </div>
      <div className="apikey">
        <h2>API Key (from link)</h2>
        <input type="text" id="api-key" onChange={handleApiKeyChange} />
      </div>
      <button className="play-button" type="submit" onClick={handlePlayClick}>
        Play!
      </button>
    </div>
  );
}

("");
