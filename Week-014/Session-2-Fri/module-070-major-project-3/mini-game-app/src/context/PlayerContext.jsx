import { createContext, useEffect, useState } from "react";

export const PlayerNameContext = createContext();
export const PlayerDataExists = createContext();
export const ThemeContext = createContext();

export function PlayerProviders({ children }) {
  const initializeName = () => {
    const localStorageName = localStorage.getItem("playerName");
    if (localStorageName == null) {
      return "Guest";
    } else {
      return JSON.parse(localStorageName);
    }
  };

  const initializeTheme = () => {
    const localStorageTheme = localStorage.getItem("theme");
    if (localStorageTheme == null) {
      return "Default";
    } else {
      return JSON.parse(localStorageTheme);
    }
  };

  const initializeDataExists = () => {
    const localStorageDataExists = localStorage.getItem("playerDataExists");
    if (localStorageDataExists == null) {
      return false;
    } else {
      return JSON.parse(localStorageDataExists);
    }
  };

  const [playerName, setPlayerName] = useState(initializeName);
  const [theme, setTheme] = useState(initializeTheme);
  const [playerDataExists, setPlayerDataExists] =
    useState(initializeDataExists);

  // Any time playerName, DataExists, or theme changes, push update to localStorage
  useEffect(() => {
    localStorage.setItem("playerName", JSON.stringify(playerName));
    localStorage.setItem("playerDataExists", JSON.stringify(playerDataExists));
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [playerName, playerDataExists, theme]);

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
