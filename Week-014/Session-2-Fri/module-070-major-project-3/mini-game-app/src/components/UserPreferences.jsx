import { useContext, useState } from "react";
import { PlayerExists, PlayerNameContext } from "../context/PlayerContext";

export default function UserPreferences() {
  const { playerName, setPlayerName } = useContext(PlayerNameContext);
  const { setPlayerExists } = useContext(PlayerExists);

  const handleClick = (event) => {
    event.preventDefault();
    setPlayerExists(true);
  };
  
  return (
    <div className="create-user-wrap">
      <label htmlFor="player-name">Player Name</label>
      <input
        type="text"
        id="player-name"
        value={playerName}
        onChange={(e) => {
          setPlayerName(e.target.value);
        }}
      />
      <button type="submit" onClick={handleClick}>
        Save Name
      </button>
    </div>
  );
}
