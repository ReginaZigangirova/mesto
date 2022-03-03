export default class UserInfo {
    constructor({ profileName, profileDescription }) {
        this._nameElement = document.querySelector(profileName);
        this._jobElement = document.querySelector(profileDescription);
    }

    getUserInfo() {
        this._userData = {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent
        };

        return this._userData;
    }

    setUserInfo({ name, job }) {
        this._nameElement.textContent = name;
        this._jobElement.textContent = job;
    }
}