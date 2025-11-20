import { useState } from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRouteDashboard from "./components/ProtectedRouteDashboard";
import Dashboard from "./pages/Dashboard";
import WhyInvest from "./pages/WhyInvestPage";

function App() {
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const checkForLogin = () => {
    if (localStorageUser != null) {
      return true;
    } else {
      return false;
    }
  };

  const initializeUsername = () => {
    if (isLoggedIn) {
      return localStorageUser.username;
    } else {
      return "";
    }
  };

  const initializePassword = () => {
    if (isLoggedIn) {
      return localStorageUser.password;
    } else {
      return "";
    }
  };
  const [isLoggedIn, setLogin] = useState(checkForLogin);
  const [username, setUsername] = useState(initializeUsername);
  const [password, setPassword] = useState(initializePassword);

  // // Initialize things

  // if (localStorageUser != null) {
  //   setLogin(true);
  //   setUsername(localStorageUser.username);
  //   setPassword(localStorageUser.password);
  // }

  return (
    <>
      <Header
        loginStatus={isLoggedIn}
        username={username}
        setLoggedIn={setLogin}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/why-invest" element={<WhyInvest />} />
        <Route
          path="/login"
          element={
            <LoginPage
              setLogin={setLogin}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRouteDashboard isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRouteDashboard>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
