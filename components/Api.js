export class Api {
    constructor(settings) {
        this.settings = settings;
    }

    /*загрузка информации о пользователе с сервера*/
    getUserInfo() {
        return fetch(this.settings.userInfoUrl, {
            headers: this.settings.headers
            })
            .then((res) => (res.ok) ? (res.json()) : Promise.reject('server-error'))
            .catch((err) => {
            console.log(err);
        }); 
    }

    /*сохранить на сервере отредактированные данные пользователя*/
    setUserInfo(data) {
        return fetch(this.settings.userInfoUrl, {
            method: 'PATCH',
            headers: this.settings.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.profession,
              })
            })
            .then((res) => (res.ok) ? (res.json()) : Promise.reject('server-error'))
            .catch((err) => {
            console.log(err);
        }); 
    }

    /*загрузка аватара с сервера*/
    getAvatar() {
        return fetch(this.settings.userAvatarUrl, {
            headers: this.settings.headers
            })
            .then((res) => (res.ok) ? (res.json()) : Promise.reject('server-error'))
            .catch((err) => {
            console.log(err);
        }); 
    }


    /*сохранить на сервере отредактированные данные пользователя*/
    setAvatar(data) {
        return fetch(this.settings.userAvatarUrl, {
            method: 'PATCH',
            headers: this.settings.headers,
            body: JSON.stringify({
                avatar: data.avatar,
              })
            })
            .then((res) => (res.ok) ? (res.json()) : Promise.reject('server-error'))
            .catch((err) => {
            console.log(err);
        }); 
    }

     /*отправить на сервер лайк карточки*/
     setLike(id) {
        return fetch(`${this.settings.baseUrl}cards/${id}/likes `, {
            method: 'PUT',
            headers: this.settings.headers,
            })
            .then((res) => (res.ok) ? (res.json()) : Promise.reject('server-error'))
            .catch((err) => {
            console.log(err);
        }); 
    }

         /*удалить лайк карточки на сервере*/
         deleteLike(id) {
            return fetch(`${this.settings.baseUrl}cards/${id}/likes `, {
                method: 'DELETE',
                headers: this.settings.headers,
                })
                .then((res) => (res.ok) ? (res.json()) : Promise.reject('server-error'))
                .catch((err) => {
                console.log(err);
            }); 
        }

      /*загрузить карточки с сервера*/
      getCards() {
        return fetch(this.settings.cardsUrl, {
            headers: this.settings.headers
            })
            .then((res) => (res.ok) ? (res.json()) : Promise.reject('server-error'))
            .catch((err) => {
            console.log(err);
        }); 
    }

    /*отправить карточку на сервер*/
    setCard(data) {
        return fetch(this.settings.cardsUrl, {
            method: 'POST',
            headers: this.settings.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
              })
            })
            .then(res => res.ok ? res.json() : Promise.reject('server-error'))
            .catch((err) => {
            console.log(err);
        }); 
    }

    deleteCard(id) {
        return fetch(`${this.settings.cardsUrl}/${id}`, {
            method: 'DELETE',
            headers: this.settings.headers,
            })
            .then(res => res.ok ? res.json() : Promise.reject('server-error'))
            .catch((err) => {
            console.log(err);
        }); 
    }


}