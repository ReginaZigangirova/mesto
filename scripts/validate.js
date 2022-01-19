//показ ошибки
const showError = (form, input, errorMessageText, errorMessageClass, inputErrorClass) => {
        const errorMessage = form.querySelector(`#${input.id}-error`);
        errorMessage.textContent = errorMessageText;
        errorMessage.classList.add(errorMessageClass);
        input.classList.add(inputErrorClass);
    }
    //скрытие ошибки 
const hideError = (form, input, errorMessageClass, inputErrorClass) => {
    const errorMessage = form.querySelector(`#${input.id}-error`);
    errorMessage.textContent = '';
    errorMessage.classList.remove(errorMessageClass);
    input.classList.remove(inputErrorClass);
}

//кнопка 
const hasInvalidInput = (inputs) => {
    return Array.from(inputs).some((el) => !el.validity.valid);
}

const toggleButtonError = (inputs, button, inactiveButtonClass) => {
    if (hasInvalidInput(inputs)) {
        button.classList.add(inactiveButtonClass);
        button.disabled = true;
    } else {
        button.classList.remove(inactiveButtonClass);
        button.disabled = false;
    }
}

//получение ошибки 
const chekInputValid = (form, input, { inputErrorClass, errorClass }) => {
    if (!input.validity.valid) {
        showError(form, input, input.validationMessage, errorClass, inputErrorClass);
    } else {
        hideError(form, input, errorClass, inputErrorClass);
    }
}

//поиск инуптов внутри каждой формы 
const setInputListeners = (form, { inputSelector, inactiveButtonClass, submitButtonSelector, ...rest }) => {
    const inputs = form.querySelectorAll(inputSelector);
    const button = form.querySelector(submitButtonSelector);
    inputs.forEach((input) => {
        input.addEventListener('input', () => {
            chekInputValid(form, input, rest);
            toggleButtonError(inputs, button, inactiveButtonClass);
        });
    });
};

//проходимся по формам, откл. отправки формы
const enableValidation = ({ formSelector, ...rest }) => {
    const forms = document.querySelectorAll(formSelector);

    forms.forEach((form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
        });
        setInputListeners(form, rest);
    });
};

//очистка ошибок при повторном открытии попапа:
const resetErrorInput = (inputs, form) => {
    //const buttonElement = form.querySelector(submitButtonSelector) //находим кнопку
    //const inputData = form.querySelectorAll(inputSelector) //находим все инпуты внутри формы
    const inputList = Array.from(inputs); //делаем из них массив

    inputList.forEach((input) => { //для каждого инпута из массива
        hideError(form, input, inputs); //скрываем ошибку инпута
    });

    //toggleButtonError(inputList, ...rest); //переключаем кнопку в корректное состояние
}


enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});