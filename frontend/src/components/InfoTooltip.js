import React from "react";

function InfoTooltip(props) {
  return (
    <section className={`popup ${props.isOpen && "popup_active"}`}>
      <div className="popup__container popup__container_type_tooltip">
        <div
          className={`${
            props.successful
              ? "popup__tooltip-img"
              : "popup__tooltip-img_type_error"
          }`}
        ></div>
        <p className="popup__tooltip-message">{props.message}</p>
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
      </div>
    </section>
  );
}

export default InfoTooltip;
