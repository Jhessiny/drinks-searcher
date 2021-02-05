import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = (props) => {
  return (
    <header>
      <h1>
        <Link to="/">Drinks' Searcher</Link>
      </h1>
      {props.isAuth && (
        <>
          <nav>
            <Link className="nav-item" to="/">
              <i class="fa fa-search"></i>
            </Link>
            <Link className="nav-item" to="/user/:id">
              <i class="fa fa-user"></i>
            </Link>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
