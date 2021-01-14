import React from "react";
import PropTypes from "prop-types";
import "./Navbar.css";

const Navbar = (props) => {
  return (
    <header>
      <h1>Memory Game</h1>
      <nav>
        <li>
          <a onClick={props.onGameReset}>New Game</a>
        </li>
      </nav>
    </header>
  );
};

Navbar.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Navbar;
