export class UserInfo {
    constructor({userNameSelector, userDescriptionSelector, profileAvatarSelector}) {
        this._userName = document.querySelector(userNameSelector);
        this._userDescription = document.querySelector(userDescriptionSelector);
        this._profileAvatar = document.querySelector(profileAvatarSelector);
    }
    /*считывает данные пользователя со страницы и возвращает объект с данными*/
    getUserInfo() {
        const userInfo = {};
        userInfo.userName = this._userName.textContent;
        userInfo.userDescription = this._userDescription.textContent;
        return userInfo;
        }

    /*принимает новые данные пользователя и добавляет их на страницу.*/
    setUserInfo(data) {
        const {name, about} = data;
        this._userName.textContent = name;
        this._userDescription.textContent = about;
    }

    setAvatar(data) {
        this._profileAvatar.src = data.avatar;
    }
}