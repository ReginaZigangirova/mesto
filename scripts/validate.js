// получение ошибки
const checkInputValidity = (formElement, inputElement) => {
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;
        showError(formElement, inputElement, errorMessage);
    } else {
        hideError(formElement, inputElement);
    }
};

//показ ошибки
const showError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
    inputElement.classList.add(validationConfig.inputErrorClass);
}

//скрытие ошибки
const hideError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(validationConfig.errorClass);
    inputElement.classList.remove(validationConfig.inputErrorClass);
}


const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
};

//кнопка
const toggleButtonState = (inputList, buttonElement, { inactiveButtonClass }) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};

//поиск инуптов внутри каждой формы 
const setEventListeners = (formElement, { inputSelector, submitButtonSelector }) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    inputList.forEach((inputSelector) => {
        inputSelector.addEventListener('input', () => {
            checkInputValidity(formElement, inputSelector);
            toggleButtonState(inputList, buttonElement, validationConfig);
        })
    })
}

//проходимся по формам, откл. отправки формы
const enableValidation = ({ formSelector }) => {
    const formElements = document.querySelectorAll(formSelector);
    const formList = Array.from(formElements);
    const formListIterator = (formElement) => {
        const submitFormHandler = (evt) => {
            evt.preventDefault();
        };
        formElement.addEventListener('submit', submitFormHandler);
        setEventListeners(formElement, validationConfig);
    };
    formList.forEach(formListIterator);
};

//сброс валидации инпутов
const resetErrorInput = (formElement, { submitButtonSelector, inputSelector }) => {
    const buttonElement = formElement.querySelector(submitButtonSelector);
    const inputData = formElement.querySelectorAll(inputSelector);
    const inputList = Array.from(inputData);

    inputList.forEach((inputElement) => {
        hideError(formElement, inputElement, inputData);
    });

    toggleButtonState(inputList, buttonElement, validationConfig);
}

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: '.popup__save_disabled',
    inputErrorClass: '.popup__input-error',
    errorClass: '.popup__input-error_active'
};
enableValidation(validationConfig);