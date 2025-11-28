import { useContext, useState } from "react";
import Gameboard from "../components/Gameboard";
import { PlayerExists } from "../context/PlayerContext";
import UserPreferences from "../components/UserPreferences";

export default function Game() {
  const { playerExists } = useContext(PlayerExists);

  return (
    <div className="game-wrap">
      {playerExists ? <Gameboard /> : <UserPreferences />}
    </div>
  );
}
