import { Card } from './card.js';
import { initialCards } from './array.js';
import { FormValidator } from './validate.js'
import { validationConfig } from './config.js'
//модалка профиля
const popups = document.querySelectorAll('.popup');
const editModal = document.querySelector('.popup_type_edit');
const editOpenButton = document.querySelector('.profile__button');
const editCloseButton = editModal.querySelector('.popup__close');

const editForm = editModal.querySelector('.popup__form');
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//модалка добавления карточки 
const addCardModal = document.querySelector('.popup_type_add-card');
const addCardButton = document.querySelector('.profile__button-plus');
const addCardCloseButton = addCardModal.querySelector('.popup__close');
const addCardForm = addCardModal.querySelector('.popup__form');

//модалка картинки
export const imgModal = document.querySelector('.popup_type_img');
const imgModalCloseButton = imgModal.querySelector('.popup__close');
export const modalImg = document.querySelector('.popup__img');
export const modaltitle = document.querySelector('.popup__title');

const section = document.querySelector('.card');
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputCardLink = document.querySelector('.popup__input_type_card-link');

const validFormEdit = new FormValidator(validationConfig, editForm);
const validFormaddCard = new FormValidator(validationConfig, addCardForm);

validFormEdit.enableValidation();
validFormaddCard.enableValidation();
//открытие модалок

export function openModal(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener("keydown", closeOnEsc);
}

//закрытие модалок
function closeModal(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener("keydown", closeOnEsc);
}

//закрытиe модалок на Overlay 
popups.forEach((modal) => {
    modal.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains("popup_opened")) {
            closeModal(modal)
        }
    })
})

// закрытие модалок на Esc
function closeOnEsc(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
        const modalOpened = document.querySelector('.popup_opened');
        closeModal(modalOpened);
    }
}

//открытие модалки профиля
editOpenButton.addEventListener('click', function() {
        openModal(editModal);
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent;
        validFormEdit.resetErrorInput()
    })
    //закрытие модалки профиля
editCloseButton.addEventListener('click', function() {
    closeModal(editModal);

})

//открытие модалки добавления карточки
addCardButton.addEventListener('click', function() {
    openModal(addCardModal);
    addCardForm.reset();
    validFormaddCard.resetErrorInput()
});

//закрытие модалки добавления карточки
addCardCloseButton.addEventListener('click', function() {
    closeModal(addCardModal);
});

//форма профиля
editForm.addEventListener('submit', function formSubmitEditHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeModal(editModal);
})

function addCard(item) {
    section.prepend(item);
};

function makeCard(item) {
    const card = new Card(item.name, item.link, '.card-template');
    const cardElement = card.createCard();
    addCard(cardElement);
};

initialCards.forEach((item) => {
    makeCard(item);
});

imgModalCloseButton.addEventListener('click', function() {
    closeModal(imgModal);
})

addCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    makeCard({
        name: inputCardName.value,
        link: inputCardLink.value
    })
    closeModal(addCardModal);
})