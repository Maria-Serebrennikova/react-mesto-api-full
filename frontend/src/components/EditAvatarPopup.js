import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);  

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name={"avatar-change"}
      title={"Обновить аватар"}
      buttonName={"Сохранить"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        id="avatar-link"
        type="url"
        className="popup__info popup__info_type_avatar-change"
        name="avatar"
        placeholder="https://somewebsite.com/someimage.jpg"
        required
      />
      <span className="popup__error popup__error_visible avatar-link-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
