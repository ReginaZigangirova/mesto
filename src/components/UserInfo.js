export default class UserInfo {
    constructor({ profileName, profileDescription, avatar }) {
        this._nameElement = document.querySelector(profileName);
        this._jobElement = document.querySelector(profileDescription);
        this._avatarElement = document.querySelector(avatar);
    }

    getUserInfo() {
        this._userData = {
            name: this._nameElement.textContent,
            about: this._jobElement.textContent,
            avatar: this._avatarElement.src
        };

        return this._userData;
    }
    setUserInfo(name, about, avatar) {
        this._nameElement.textContent = name;
        this._jobElement.textContent = about;
    }
    setUserAvatar(formAvatar) {
        this._avatarElement.src = formAvatar;
    }
}