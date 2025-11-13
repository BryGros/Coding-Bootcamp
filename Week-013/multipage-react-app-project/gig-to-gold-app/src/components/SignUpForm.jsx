import { useState } from "react";
import { useNavigate, useLocation } from "react-router";

export default function SignUpForm({
  setLogin,
  setShowLogin,
  setUsername,
  setPassword,
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
    let enteredPassword = passwordField.value;
    const confirmPassword = document.getElementById("confirm-password");
    let enteredConfPass = confirmPassword.value;
    const localStorageUser = JSON.parse(localStorage.getItem("user"));

    // Validations - Checks for existing user from localStorage (mock database)
    if (
      enteredUsername == "" ||
      enteredPassword == "" ||
      enteredConfPass == ""
    ) {
      setErrorMessage("You must fill out every field!");
      setThrowError(true);
    } else if (
      localStorageUser != null &&
      localStorageUser.username == enteredUsername
    ) {
      setErrorMessage(
        "A user already exists with this username.  Please choose the 'Log in' option."
      );
      setThrowError(true);
      // Ensures the password fields match
    } else if (enteredConfPass != enteredPassword) {
      passwordField.value = "";
      confirmPassword.value = "";
      setErrorMessage("Your password fields don't match. Please retype them.");
      setThrowError(true);
    } else {
      const user = {
        username: enteredUsername,
        password: enteredPassword,
      };
      localStorage.setItem("user", JSON.stringify(user));
      setLogin(true);
      setUsername(enteredUsername);
      setPassword(enteredPassword);
      navigate(fromPath ?? "/", { return: true });
    }
  };

  const handleLoginToggle = () => {
    setShowLogin(true);
  };

  return (
    <div className="sign-up-form">
      <div className="error">{throwError ? errorMessage : ""}</div>
      <h1>Username:</h1>
      <input
        id="username"
        type="text"
        placeholder="Enter a username"
        required
      />
      <h1>Password:</h1>
      <input
        id="password"
        type="text"
        placeholder="Enter a password"
        required
      />
      <h1>Confirm Password:</h1>
      <input
        id="confirm-password"
        type="text"
        placeholder="Confirm your password a password"
        required
      />
      <div className="submit-wrap">
        <button className="login-submit" type="submit" onClick={handleSubmit}>
          Create User
        </button>
        <button id="switch-menu" onClick={handleLoginToggle}>
          Login
        </button>
      </div>
    </div>
  );
}
