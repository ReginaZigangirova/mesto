export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
        this.setEventListeners()
    }

    close() {
        this._popup.classList.remove('popup_opened');
        this._removeEventListeners();
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close()
        }
    }

    _handleOverlayClose = (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            this.close();
        }
    }

    _handleCloseButton = (evt) => {
        if (evt.target.classList.contains('popup__close')) {
            this.close();
        }
    }

    setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose);
        document.addEventListener('click', this._handleOverlayClose);
        this._popup.addEventListener('click', this._handleCloseButton);
    }

    _removeEventListeners() {
        document.removeEventListener('keydown', this._handleEscClose);
        document.removeEventListener('click', this._handleOverlayClose);
        this._popup.removeEventListener('click', this._handleCloseButton);
    }
}