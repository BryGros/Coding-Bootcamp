import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Game from "./pages/Game";
import GameOver from "./pages/GameOver";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import NotFoundPage from "./pages/NotFoundPage";
import Preferences from "./pages/Preferences";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/Coding-Bootcamp/code-cracker/" element={<Home />} />
        <Route path="/Coding-Bootcamp/code-cracker/play" element={<Game />} />
        <Route path="/game-over" element={<GameOver />} />
        <Route
          path="/Coding-Bootcamp/code-cracker/leaderboard"
          element={<LeaderBoardPage />}
        />
        <Route
          path="/Coding-Bootcamp/code-cracker/preferences"
          element={<Preferences />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
