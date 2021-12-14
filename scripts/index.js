const popupOpenButton = document.querySelector('.profile__button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

function openPopup() {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');

}

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

let formElement = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let popupForm = popupContainer.querySelector('.popup__form');

let nameInput = popupForm.querySelector('.popup__name');
let jobInput = popupForm.querySelector('.popup__job');

let saveForm = popupContainer.querySelector('.popup__save');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

function popupContent() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

popupCloseButton.addEventListener('click', popupContent);
saveForm.addEventListener('click', closePopup);
saveForm.addEventListener('click', formSubmitHandler);
saveForm.addEventListener('submit', formSubmitHandler);