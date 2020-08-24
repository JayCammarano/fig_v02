import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import SignOut from "./SignOut";

export const NavBar = (props) => {
  const [isActive, setisActive] = useState(false);
  const triggerActiveBurger = () => {
    if (isActive === false) {
      setisActive(true);
    } else {
      setisActive(false);
    }
  };
  let loggedIn;
  let addArtist;
  if (props.loggedInStatus) {
    loggedIn = <SignOut />;
  } else {
    loggedIn = (
      <>
        <Link to="/login" className="navbar-item">
          sign in
        </Link>
        <Link to="/signup" className="navbar-item">
          sign up
        </Link>
      </>
    );
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item is-dark" to="/">
          fig.
        </Link>
        <a
          role="button"
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          onClick={triggerActiveBurger}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-start">
          <Link className="navbar-item" to="/artists">
            artists
          </Link>
        </div>

        <div className="navbar-end">{loggedIn}</div>
      </div>
    </nav>
  );
};

export default NavBar;
