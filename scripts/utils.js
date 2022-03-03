//карточки
export const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: '.popup__save_disabled',
    inputErrorClass: '.popup__input-error',
    errorClass: '.popup__input-error_active'
};
//модалка профиля
const popups = document.querySelectorAll('.popup');
const editModal = document.querySelector('.popup_type_edit');
export const editOpenButton = document.querySelector('.profile__button');
const editCloseButton = editModal.querySelector('.popup__close');

export const editForm = editModal.querySelector('.popup__form');
const placeInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_job');

//модалка добавления карточки 
export const addCardModal = document.querySelector('.popup_type_add-card');
export const addCardButton = document.querySelector('.profile__button-plus');
const addCardCloseButton = addCardModal.querySelector('.popup__close');
export const addCardForm = addCardModal.querySelector('.popup__form');

//модалка картинки
export const imgModal = document.querySelector('.popup_type_img');
const imgModalCloseButton = imgModal.querySelector('.popup__close');
export const modalImg = document.querySelector('.popup__img');
export const modaltitle = document.querySelector('.popup__title');

export const section = document.querySelector('.card');
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputCardLink = document.querySelector('.popup__input_type_card-link');

export const editSelector = {
    profileName: '.profile__name',
    profileDescription: '.profile__job',
}