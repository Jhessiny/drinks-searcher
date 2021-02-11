import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = ({ isAuth, logout }) => {
  return (
    <header>
      <h1>
        <Link to="/">Drinks' Searcher</Link>
      </h1>
      {isAuth && (
        <>
          <nav>
            <Link className="nav-item" to="/">
              <i className="fa fa-search"></i>
            </Link>
            <div className="menu-user nav-item">
              <i className="fa fa-user"></i>
              <div className="menu-drop">
                <ul>
                  <li>
                    <Link className="drop-link li-item" to="/user/:id">
                      Profile
                    </Link>
                  </li>
                  <li className="li-item" onClick={logout}>
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
