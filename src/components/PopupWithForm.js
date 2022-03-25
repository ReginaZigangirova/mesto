import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { submitHandler }) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputsList = this._popup.querySelectorAll('.popup__input');
        this._loadingButton = this._popup.querySelector('.popup__save');
        this._buttonText = this._loadingButton.textContent;
    }

    _getInputValues() {
        this._inputValue = {};
        this._inputsList.forEach((input) => {
            this._inputValue[input.name] = input.value;
        });
        return this._inputValue;
    }
    cangeSubmitHandler({ newSubmitHandler }) {
        this._submitHandler = newSubmitHandler
    }
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', this._formSubmitHandler);
    }
    _formSubmitHandler = (evt) => {
        evt.preventDefault();
        this._submitHandler(this._getInputValues());
    }
    renderLoading(isLoading) {
        if (isLoading) {
            this._loadingButton.textContent = 'Сохранение...';
        } else {
            this._loadingButton.textContent = this._buttonText;
        }
    }
    close() {
        super.close();
        this._popupForm.removeEventListener('submit', this._formSubmitHandler);
        this._popupForm.reset();
    }

}