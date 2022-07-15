import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name={"rename-user"}
      title={"Редактировать профиль"}
      buttonName={"Сохранить"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={name || ''}
        onChange={handleChangeName}
        type="text"
        id="username"
        placeholder="Имя"
        className="popup__info popup__info_type_name"
        name="name"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__error popup__error_visible username-error"></span>
      <input
        value={description || ''}
        onChange={handleChangeDescription}
        type="text"
        id="status"
        placeholder="Профессиональная деятельность"
        className="popup__info popup__info_type_status"
        name="about"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__error popup__error_visible status-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
