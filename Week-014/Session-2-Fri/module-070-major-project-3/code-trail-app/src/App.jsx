import { useState } from "react";
import { Route, Routes } from "react-router";
import Game from "./pages/Game";
import Navigation from "./components/Navigation";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/play" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;
