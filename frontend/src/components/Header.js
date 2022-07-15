import React from "react";
import logo from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <div className="header__container">
        <div className="header__email">{props.userEmail}</div>
        <button
          className="header__button"
          onClick={props.handleClick}
          type="button"
        >
          {props.buttonName}
        </button>
      </div>
    </header>
  );
}

export default Header;
