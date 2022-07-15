import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__trash ${
    isOwn ? "" : "card__trash_hidden"
  }`;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_active" : ""
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="card" key={props.card.id}>
      <div className="card__image" onClick={handleClick}>
        <img
          src={props.card.link}
          className="card__img"
          alt={`Карточка ${props.card.name}`}
        />
      </div>
      <button
        type="button"
        aria-label="basket"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="card__bottom">
        <h3 className="card__name">{props.card.name}</h3>
        <div className="card__likes-zone">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          ></button>
          <span className="card__like-count">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
