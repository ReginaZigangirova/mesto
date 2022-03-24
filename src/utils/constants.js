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
const editModal = document.querySelector('.popup_type_edit');
export const editOpenButton = document.querySelector('.profile__button');
export const editForm = editModal.querySelector('.popup__form');

//модалка добавления карточки 
export const addCardModal = document.querySelector('.popup_type_add-card');
export const addCardButton = document.querySelector('.profile__button-plus');
export const addCardForm = addCardModal.querySelector('.popup__form');
//модалка аватар
export const avatarOpenButton = document.querySelector('.profile__pen');
export const avatarModal = document.querySelector('.popup_type_avatar');
export const avatarForm = avatarModal.querySelector('.popup__form');

export const section = document.querySelector('.card');

export const editSelector = {
    profileName: '.profile__name',
    profileDescription: '.profile__job',
    avatar: '.profile__avatar'
}