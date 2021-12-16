const popupOpenButton = document.querySelector('.profile__button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');

}

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

const popupForm = document.querySelector('.popup__form');

const nameInput = popupForm.querySelector('.popup__input');
const jobInput = popupForm.querySelector('.popup__input_job');

const saveForm = document.querySelector('.popup__save');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

saveForm.addEventListener('click', closePopup);
saveForm.addEventListener('click', formSubmitHandler);
saveForm.addEventListener('submit', formSubmitHandler);