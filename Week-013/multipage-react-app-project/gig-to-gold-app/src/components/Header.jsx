import { useState } from "react";
import { Link } from "react-router";

export default function Header({ loginStatus, username }) {
  const login = (
    <Link className="nav-login-link" to="/login">
      <i className="fa-solid fa-user"></i> Login
    </Link>
  );
  const loggedIn = (
    <Link className="nav-login-link" to="">
      <i className="fa-solid fa-user"></i> Hello, {username}
    </Link>
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
        <Link className="nav-link" href="/">
          Home
        </Link>
        <Link className="nav-link" to="">
          Why Invest?
        </Link>
        <Link className="nav-link" to="">
          Dashboard
        </Link>
        {loginStatus ? loggedIn : login}
      </div>
    </nav>
  );
}
