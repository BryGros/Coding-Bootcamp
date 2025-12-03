import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { PlayerProviders } from "./context/PlayerContext.jsx";
import { GameObjectProviders } from "./context/GameContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PlayerProviders>
        <GameObjectProviders>
          <App />
        </GameObjectProviders>
      </PlayerProviders>
    </BrowserRouter>
  </StrictMode>
);
