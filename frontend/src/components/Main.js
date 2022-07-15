import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar" onClick={onEditAvatar}>
          <img
            className="profile__avatar-img"
            src={currentUser.avatar}
            alt="Аватар"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__rename"
            onClick={onEditProfile}
            aria-label="change"
            type="button"
          ></button>
          <p className="profile__status">{currentUser.about}</p>
        </div>
        <button
          className="profile__button"
          onClick={onAddPlace}
          type="button"
        ></button>
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;