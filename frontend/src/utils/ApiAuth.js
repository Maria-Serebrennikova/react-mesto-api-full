class ApiAuth {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((data) => {
      throw new Error(data.message);
    });
  }

  registration(password, email) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((res) => this.checkResponse(res));
  }

  login(password, email) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((res) => this.checkResponse(res));
  }

  getUserData(jwt) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => this.checkResponse(res));
  }
}

export const apiAuth = new ApiAuth({
  baseUrl: `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`,
  //baseUrl: '//localhost:3001',
 });
