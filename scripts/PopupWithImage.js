import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPicture = document.querySelector('.popup__img');
        this._popupDescription = document.querySelector('.popup__title');
    }

    open(name, link) {
        this._popupDescription.textContent = name;
        this._popupPicture.src = link;
        this._popupPicture.alt = name;
        super.open();
    }
}