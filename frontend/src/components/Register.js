import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSignUp(password, email);
  }
  return (
    <div className="popup__container popup__container_theme_dark">
      <h3 className="popup__header popup__header_theme_dark">Регистрация</h3>
      <form onSubmit={handleSubmit} className="popup__form" action="/">
        <input
          className="popup__info popup__info_theme_dark"
          value={email}
          onChange={handleChangeEmail}
          type="text"
          placeholder="Email"
          required
        />
        <input
          className="popup__info popup__info_theme_dark"
          value={password}
          onChange={handleChangePassword}
          type="password"
          placeholder="Пароль"
          required
        />
        <button
          type="submit"
          className="popup__button popup__button_theme_dark"
        >
          Зарегистрироваться
        </button>
        <Link to="/signin" className="popup__link">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}

export default Register;
