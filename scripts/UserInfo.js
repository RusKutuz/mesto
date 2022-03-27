import {profileHeader, profileProfession} from './data.js';

export class UserInfo {
    constructor({userNameSelector, userDescriptionSelector}) {
        this._userName = document.querySelector(userNameSelector).textContent;
        this._userDescription = document.querySelector(userDescriptionSelector).textContent;
    }
    /*возвращает объект с данными пользователя. Этот метод пригодится когда 
    данные пользователя нужно будет подставить в форму при открытии.*/
    getUserInfo() {
        const userInfo = {};
        userInfo.userName = this._userName;
        userInfo.userDescription = this._userDescription;
        return userInfo;
        }

    /*принимает новые данные пользователя и добавляет их на страницу.*/
    setUserInfo(data) {
        const {name, profession} = data;
        this._userName = name;
        this._userDescription = profession;
        profileHeader.textContent = this._userName;
        profileProfession.textContent = this._userDescription;
    }
}