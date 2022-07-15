import React from "react";

function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_active" : ""
      }`}
    >
      <div className="popup__container">
        <h3 className="popup__header">{props.title}</h3>
        <form
          onSubmit={props.onSubmit}
          name={props.name}
          className={`popup__form popup__form_type_${props.name}`}
          action="/"          
        >
          {props.children}
          <button type="submit" className="popup__button">
            {props.buttonName}
          </button>
        </form>
        <button
          type="button"
          aria-label="close"
          className="popup__close"
          onClick={props.onClose}
        ></button>
      </div>
    </section>
  );
}
export default PopupWithForm;
