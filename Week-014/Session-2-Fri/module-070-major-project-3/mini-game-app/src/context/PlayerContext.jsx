import { createContext, useContext, useState } from "react";

export const PlayerNameContext = createContext();
export const PlayerExists = createContext();
export const ThemeContext = createContext();

export function PlayerProviders({ children }) {
  const [playerName, setPlayerName] = useState("");
  const [theme, setTheme] = useState("default");
  const [playerExists, setPlayerExists] = useState(false);

  return (
    <PlayerNameContext.Provider value={{ playerName, setPlayerName }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <PlayerExists.Provider value={{ playerExists, setPlayerExists }}>
          {children}
        </PlayerExists.Provider>
      </ThemeContext.Provider>
    </PlayerNameContext.Provider>
  );
}
