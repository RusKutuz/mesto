export class Api {
  constructor(settings) {
    this.baseUrl = settings.baseUrl;
    this.headers = settings.headers;
  }

  /*загрузка информации о пользователе с сервера*/
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject("server-error")));
  }

  /*сохранить на сервере отредактированные данные пользователя*/
  setUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
    .then((res) => (res.ok ? res.json() : Promise.reject("server-error")));
  }


  /*сохранить на сервере отредактированные данные пользователя*/
  setAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject("server-error")));
  }

  /*отправить на сервер лайк карточки*/
  setLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes `, {
      method: "PUT",
      headers: this.headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject("server-error")));
  }

  /*удалить лайк карточки на сервере*/
  deleteLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes `, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject("server-error")));
  }

  /*загрузить карточки с сервера*/
  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    })
    .then((res) => (res.ok ? res.json() : Promise.reject("server-error")));
  }

  /*отправить карточку на сервер*/
  setCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject("server-error")));
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject("server-error")));
  }
}


  /*загрузка аватара с сервера
  getAvatar() {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      headers: this.headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject("server-error")))
  }
*/