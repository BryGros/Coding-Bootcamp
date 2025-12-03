import { useState } from "react";
import "./App.css";
import WelcomeMessage from "./components/WelcomeMessage";
import UserProfile from "./components/UserProfile";

function App() {
  const userOne = {
    name: "Sarah",
    email: "test@email.com",
  };

  return (
    <>
      <WelcomeMessage />
      {/* Broken Eample Pt 1 */}
      {/* <UserProfile /> */}

      <UserProfile user={userOne} />
    </>
  );
}

export default App;
