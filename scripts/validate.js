export class FormValidator {
    constructor(config, form) {
        this._config = config
        this._form = form
        this._inputSelector = config.inputSelector;
    }

    _hideError(inputElement) {
        this.errorElement = this._form.querySelector(`#${inputElement.id}-error`)
        inputElement.classList.remove(this._config.inputErrorClass)
        this.errorElement.classList.remove(this._config.errorClass)
        this.errorElement.textContent = ''
    }

    _showError(inputElement) {
        this.errorElement = this._form.querySelector(`#${inputElement.id}-error`)
        inputElement.classList.add(this._config.inputErrorClass)
        this.errorElement.classList.add(this._config.errorClass)
        this.errorElement.textContent = inputElement.validationMessage
    }


    _toggleButtonState() {
        const isFormValid = this._form.checkValidity()
        this._buttonElement.disabled = !isFormValid
    }

    _checkInputValidity(inputElement) {
        if (inputElement.validity.valid) {
            this._hideError(inputElement)
        } else {
            this._showError(inputElement)
        }
    }

    _setEventListeners() {
        this._form.addEventListener('submit', (e) => {
            e.preventDefault()
        })
        this._inputList = this._form.querySelectorAll(this._config.inputSelector)
        this._buttonElement = this._form.querySelector(this._config.submitButtonSelector)
        this._toggleButtonState()
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement)
                this._toggleButtonState()
            })
        })
    }

    resetErrorInput() {
        this._inputList.forEach((inputElement) => {
            this._hideError(inputElement)
        })
        this._toggleButtonState()
    }

    enableValidation() {
        this._setEventListeners()
    }
}