class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  _headersWithJwt() {
    return {authorization: `Bearer ${localStorage.getItem('jwt')}`, ...this.headers}
  }

  getProfile() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this._headersWithJwt(),
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this._headersWithJwt(),
    }).then(this._checkResponse);
  }

  editProfile(info) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headersWithJwt(),
      body: JSON.stringify({
        name: info.name,
        about: info.about,
      }),
    }).then(this._checkResponse);
  }

  addCard(obj) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this._headersWithJwt(),
      body: JSON.stringify({
        name: obj.name,
        link: obj.link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id} `, {
      method: "DELETE",
      headers: this._headersWithJwt(),
      }).then(this._checkResponse);
  }

  addLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headersWithJwt(),
    }).then(this._checkResponse);
  }

  deleteLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headersWithJwt(),
    }).then(this._checkResponse);
  }

    changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.deleteLike(id);
    } else {
      return this.addLike(id);
    }
}


  changeAvatar(formValues) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headersWithJwt(),
      body: JSON.stringify({
        avatar: formValues.avatar,
      }),
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: `${window.location.protocol}${process.env.REACT_APP_API_URL ||
     '//localhost:3001'}`,
  //baseUrl: '//localhost:3001',
  //baseUrl: `${window.location.protocol}${process.env.REACT_APP_API_URL}`,
  headers: {
    "Content-Type": "application/json",
    'Accept': 'application/json',
  },
});
