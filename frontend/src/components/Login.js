import React, { useState } from "react";

function Login({ onSignIn, errorMessage }) {
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
  onSignIn(password,email);
  }

  return (
    <div className="popup__container popup__container_theme_dark">
      <h3 className="popup__header popup__header_theme_dark">Вход</h3>
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
        <span className="popup__error popup__error_visible">
          {errorMessage}
        </span>
        <button
          type="submit"
          className="popup__button popup__button_theme_dark"
        >Войти</button>
      </form>
    </div>
  );
}

export default Login;
