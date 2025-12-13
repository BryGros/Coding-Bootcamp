import { useContext, useState } from "react";
import {
  PlayerDataExists,
  PlayerNameContext,
  ThemeContext,
} from "../context/PlayerContext";
import { GameObject } from "../context/GameContext";
import { Link, useLocation } from "react-router";

export default function UserPreferences() {
  const { playerName, setPlayerName } = useContext(PlayerNameContext);
  const { setPlayerDataExists } = useContext(PlayerDataExists);
  const { theme, setTheme } = useContext(ThemeContext);
  const { gameObject, setGameObject } = useContext(GameObject);
  const { pathname } = useLocation();

  const [editName, setEditName] = useState(false);
  const [showApiError, setShowApiError] = useState(false);

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
    if (gameObject.apiKey == "") {
      setShowApiError(true);
      return;
    }
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
      <label htmlFor="player-name">Player Name:</label>
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
      <h2 className="themed-text">
        {playerName == "" ? "Not Set" : playerName}
      </h2>
      <button onClick={handleEditNameClick}>
        <i className="fa-regular fa-pen-to-square"></i>
      </button>
    </div>
  );

  return (
    <div className={`component-wrap theme-${theme}`}>
      {editName ? editFields : displayFields}
      <h2>
        Theme: <span className="themed-text">{theme}</span>
      </h2>
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
      <h2>
        Difficulty: <span className="themed-text">{gameObject.difficulty}</span>
      </h2>
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
        <h2>
          API Key (from{" "}
          <Link
            to="https://rapidapi.com/wordcheckerio/api/word-checker-api?ref=producthunt"
            target="_blank"
          >
            Rapid API
          </Link>
          )
        </h2>
        <input
          type="text"
          id="api-key"
          onChange={handleApiKeyChange}
          value={gameObject.apiKey}
        />
      </div>
      {showApiError && (
        <h2>You must put in an API key for this game to work</h2>
      )}
      {pathname == "/play" && (
        <button className="play-button" type="submit" onClick={handlePlayClick}>
          Play!
        </button>
      )}
    </div>
  );
}

("");
