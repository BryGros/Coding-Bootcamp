import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

export default function LoginPage({
  setLogin,
  username,
  setUsername,
  password,
  setPassword,
}) {
  const [showLogin, setShowLogin] = useState(true);

  const logIn = (
    <LoginForm
      setLogin={setLogin}
      setShowLogin={setShowLogin}
      username={username}
      password={password}
    />
  );
  const signUpForm = (
    <SignUpForm
      setLogin={setLogin}
      setShowLogin={setShowLogin}
      setUsername={setUsername}
      setPassword={setPassword}
    />
  );

  return <div className="wrapper">{showLogin ? logIn : signUpForm}</div>;
}
