export class UserInfo {
    constructor({userNameSelector, userDescriptionSelector}) {
        this._userName = document.querySelector(userNameSelector);
        this._userDescription = document.querySelector(userDescriptionSelector);
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
        const {name, profession} = data;
        this._userName.textContent = name;
        this._userDescription.textContent = profession;
    }
}