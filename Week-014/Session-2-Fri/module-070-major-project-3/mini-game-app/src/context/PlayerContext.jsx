import { createContext, useContext, useState } from "react";

export const PlayerNameContext = createContext();
export const PlayerDataExists = createContext();
export const ThemeContext = createContext();

export function PlayerProviders({ children }) {
  const [playerName, setPlayerName] = useState("Guest");
  const [theme, setTheme] = useState("Default");
  const [playerDataExists, setPlayerDataExists] = useState(false);

  return (
    <PlayerNameContext.Provider value={{ playerName, setPlayerName }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <PlayerDataExists.Provider
          value={{ playerDataExists, setPlayerDataExists }}
        >
          {children}
        </PlayerDataExists.Provider>
      </ThemeContext.Provider>
    </PlayerNameContext.Provider>
  );
}
