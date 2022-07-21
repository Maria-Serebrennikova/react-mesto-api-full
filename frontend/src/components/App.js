import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import { apiAuth } from "../utils/ApiAuth";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "Loading...",
    about: "",
  });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [message, setMessage] = useState({ successful: false, message: "" });
  const history = useHistory();

  useEffect(() => {
    api
      .getProfile()
      .then(({data}) => {
        setCurrentUser(data);
      })
      .catch(err => console.log(err));
    api
      .getInitialCards()
      .then(({data}) => {
        setCards(data);
      })
      .catch(err => console.log(err));
    checkToken();
  }, []);

  function handleSignIn(password, email) {
    apiAuth
      .login(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          handleLogin();
          history.push("/");
        }
      })
      .catch((err) => {
        setErrorMessage(err.toString());
      });
  }

  function handleRegistration(password, email) {
    apiAuth
      .registration(password, email)
      .then((res) => {
        if (res) {
          setIsInfoTooltipOpen(true);
          setMessage({
            successful: true,
            message: "Вы успешно зарегистрировались!",
          });
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setMessage({
          successful: false,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      });
  }

  function handleLogin() {
    setLoggedIn(true);
    checkToken();
  }

  function checkToken() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        apiAuth
          .getUserData(jwt)
          .then((data) => {
            if (data) {
              setLoggedIn(true);
              history.push("/");
              setUserEmail(data.data.email);
              setCurrentUser(data);
            }
          })
          .catch((err) => console.log(err));
      }
    }
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    history.push("/signin");
  }

  function redirectToSignup() {
    history.push("/signup");
  }

  function redirectToLogin() {
    history.push("/signin");
  }

  function redirectToLoginFromRegistration() {
    if (message.successful) {
      redirectToLogin();
    }
  }

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
    redirectToLoginFromRegistration();
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard(false);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleUpdateUser(info) {
    api
      .editProfile(info)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(formValues) {
    api
      .changeAvatar(formValues)
      .then(({data}) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser.data._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(obj) {
    api
      .addCard(obj)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Switch>
            <Route path="/signup">
              <Header buttonName={"Войти"} handleClick={redirectToLogin} />
              <Register onSignUp={handleRegistration} />
            </Route>

            <Route path="/signin">
              <Header
                buttonName={"Регистрация"}
                handleClick={redirectToSignup}
              />
              <Login onSignIn={handleSignIn} errorMessage={errorMessage} />
            </Route>

            <ProtectedRoute exact path="/" loggedIn={loggedIn}>
              <Header
                buttonName={"Выйти"}
                userEmail={userEmail}
                handleClick={handleSignOut}
              />
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            </ProtectedRoute>

            </Switch>

          <Footer />
        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeInfoTooltip}
          message={message.message}
          successful={message.successful}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
