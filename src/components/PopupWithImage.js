import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImg = document.querySelector('.popup__img');
        this._popupDescription = document.querySelector('.popup__title');
    }

    open(name, link) {
        this._popupDescription.textContent = name;
        this._popupImg.src = link;
        this._popupImg.alt = name;
        super.open();
    }
}