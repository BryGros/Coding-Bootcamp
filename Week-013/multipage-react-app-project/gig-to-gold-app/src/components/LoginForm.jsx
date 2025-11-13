import { useState } from "react";
import { useNavigate, useLocation } from "react-router";

export default function LoginForm({
  setLogin,
  setShowLogin,
  username,
  password,
}) {
  const [throwError, setThrowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const fromPath = location.state?.from?.pathname;

  const handleSubmit = (event) => {
    setThrowError(false);
    event.preventDefault();
    // Get field values from form
    const usernameField = document.getElementById("username");
    const enteredUsername = usernameField.value;
    const passwordField = document.getElementById("password");
    const enteredPassword = passwordField.value;
    const localStorageUser = JSON.parse(localStorage.getItem("user"));

    // Validations - Checks for existing user from localStorage (mock database)
    if (localStorageUser == null) {
      setErrorMessage(
        "Could not log you in with this username/password combination. Have you signed up?"
      );
      setThrowError(true);
    } else if (enteredUsername != localStorageUser.username) {
      setErrorMessage(
        "Could not log you in with this username/password combination. Have you signed up?"
      );
      setThrowError(true);
    } else if (enteredPassword != localStorageUser.password) {
      setErrorMessage(
        "Could not log you in with this username/password combination. Have you signed up?"
      );
      setThrowError(true);
    } else {
      setLogin(true);
      navigate(fromPath ?? "/", { replace: true });
    }
  };

  const handleLogout = () => {
    setShowLogin(false);
  };

  return (
    <div className="login-form">
      <div className="error">{throwError ? errorMessage : ""}</div>
      <h1>Username:</h1>
      <input
        id="username"
        type="text"
        placeholder="Enter Username"
        value={username}
        required
      />
      <h1>Password:</h1>
      <input id="password" type="text" placeholder="Enter Password" required />
      <div className="submit-wrap">
        <button className="login-submit" type="submit" onClick={handleSubmit}>
          Login
        </button>
        <button id="switch-menu" onClick={handleLogout}>
          Sign Up
        </button>
      </div>
    </div>
  );
}
