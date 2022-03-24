class Api {
    constructor({ baseUrl, headers }) {
        this._headers = headers
        this._baseUrl = baseUrl
    }
    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(res.status)
        }
    }
    getProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        }).then(this._checkResponse)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        }).then(this._checkResponse)
    }
    editProfile(name, about) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-37/users/me', {
                method: 'PATCH',
                headers: {
                    authorization: '0422eec2-f505-49eb-b34a-7793c9abd9fe',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    about
                })
            })
            .then(this._checkResponse)
    }
    addCard(name, link) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-37/cards', {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        }).then(this._checkResponse)
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id} `, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._checkResponse)
    }
    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes `, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._checkResponse)
    }
    addLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes `, {
            method: "PUT",
            headers: this._headers,
        }).then(this._checkResponse)
    }

    setAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        }).then(this._checkResponse)
    }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
    headers: {
        authorization: '0422eec2-f505-49eb-b34a-7793c9abd9fe',
        'Content-Type': 'application/json'
    }
});