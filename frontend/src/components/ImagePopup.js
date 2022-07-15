import React from "react";

function ImagePopup(props) {
  return (
    <section
      className={`popup popup_type_bigscreen ${
        props.isOpen ? "popup_active" : ""
      }`}
    >
      <div className="popup__container popup__container_type_bigscreen">
        <figure className="image image_no-margin">
          <img
            className="popup__image"
            src={props.card.link}
            alt={`Карточка ${props.card.name}`}
          />          
          <p className="popup__name">{props.card.name}</p>
        </figure>
        <button
          type="button"
          className="popup__close popup__close_type_bigscreen"
          onClick={props.onClose}
        ></button>
      </div>
    </section>
  );
}

export default ImagePopup;
