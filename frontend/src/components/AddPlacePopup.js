import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name={"append-card"}
      title={"Новое место"}
      buttonName={"Создать"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="place"
        className="popup__info popup__info_type_place"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={name}
        onChange={handleChangeName}
      />
      <span className="popup__error popup__error_visible place-error"></span>
      <input
        id="email"
        type="url"
        className="popup__info popup__info_type_link"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={handleChangeLink}
      />
      <span className="popup__error popup__error_visible email-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
