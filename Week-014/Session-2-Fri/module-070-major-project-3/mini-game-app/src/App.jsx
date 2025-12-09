import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Game from "./pages/Game";
import GameOver from "./pages/GameOver";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Game />} />
        <Route path="/game-over" element={<GameOver />} />
        <Route path="/leaderboard" element={<LeaderBoardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
