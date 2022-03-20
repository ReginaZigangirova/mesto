export default class UserInfo {
    constructor({ profileName, profileDescription }) {
        this._nameElement = document.querySelector(profileName);
        this._jobElement = document.querySelector(profileDescription);
    }

    getUserInfo() {
        this._userData = {
            name: this._nameElement.textContent,
            about: this._jobElement.textContent
        };

        return this._userData;
    }
    setUserInfo(name, about) {
        this._nameElement.textContent = name;
        this._jobElement.textContent = about;
    }
}