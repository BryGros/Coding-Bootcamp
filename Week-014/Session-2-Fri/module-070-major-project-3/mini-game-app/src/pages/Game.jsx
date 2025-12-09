import { useContext } from "react";
import Gameboard from "../components/Gameboard";
import { PlayerDataExists } from "../context/PlayerContext";
import UserPreferences from "../components/UserPreferences";

export default function Game() {
  const { playerDataExists } = useContext(PlayerDataExists);

  return (
    <div className="game-wrap">
      {playerDataExists ? <Gameboard /> : <UserPreferences />}
    </div>
  );
}
