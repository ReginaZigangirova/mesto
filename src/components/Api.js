class Api {
    constructor({ baseUrl, headers }) {
        this._headers = headers
        this._baseUrl = baseUrl
            // тело конструктора
    }
    getProfile() {
        //console.log('getProfile')
        return fetch(`${this._baseUrl}/users/me`, {
                headers: this._headers
            }).then(res => res.ok ? res.json() : Promise.reject(res.status))
            .catch(console.log)
    }

    getInitialCards() {
        //console.log('getInitialCards')
        return fetch(`${this._baseUrl}/cards`, {
                headers: this._headers
            }).then(res => res.ok ? res.json() : Promise.reject(res.status))
            .catch(console.log)
    }

    // другие методы работы с API
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
    headers: {
        authorization: '0422eec2-f505-49eb-b34a-7793c9abd9fe',
        'Content-Type': 'application/json'
    }
});