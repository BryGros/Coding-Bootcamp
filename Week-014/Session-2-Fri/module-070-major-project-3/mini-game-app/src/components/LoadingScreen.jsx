import { useContext } from "react";
import { GameObject } from "../context/GameContext";
import { ThemeContext } from "../context/PlayerContext";

export default function LoadingScreen() {
  const { gameObject } = useContext(GameObject);
  const { theme } = useContext(ThemeContext);
  const loadingDiv = (
    <div className="loading-wrap">
      <div className="loader"></div>
      <h1>Loading</h1>
    </div>
  );
  const errorDiv = (
    <div>
      <h1>...Something went wrong with the API connection...</h1>
      <h2 className={`themed-text theme-${theme}`}>
        The API came back with the following error: "{gameObject.apiErrorMsg}"
      </h2>
      <h3>
        Plese check your API Key for accuracy, or ensure you have requests left
        for the month...
      </h3>
    </div>
  );
  return gameObject.apiError ? errorDiv : loadingDiv;
}
