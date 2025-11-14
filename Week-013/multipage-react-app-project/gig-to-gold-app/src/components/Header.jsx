import { useState } from "react";
import { Link, NavLink } from "react-router";

export default function Header({ loginStatus, username, setLoggedIn }) {
  const handleClick = () => {
    setLoggedIn(false);
  };

  const login = (
    <Link className="nav-login-link" to="/login">
      <i className="fa-solid fa-user"></i> Login
    </Link>
  );

  const loggedIn = (
    <div className="nav-username">
      <i className="fa-solid fa-user"></i> Hello, {username}{" "}
      <Link className="nav-logout-link" to="/" onClick={handleClick}>
        (log out)
      </Link>
    </div>
  );

  return (
    <nav>
      <div className="navbar-left-content">
        <img
          className="head-logo"
          src="./src/assets/g2g-logo.svg"
          alt="Gig to Gold Logo"
        />
        <h1 className="g2g-nav">
          GigTo<span className="navlogo-gold">Gold</span>
        </h1>
      </div>
      <div className="nav-bar">
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link-active" : "nav-link"
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link-active" : "nav-link"
          }
          to="/why-invest"
        >
          Why Invest?
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link-active" : "nav-link"
          }
          to="/dashboard"
        >
          Dashboard
        </NavLink>
        {loginStatus ? loggedIn : login}
      </div>
    </nav>
  );
}
