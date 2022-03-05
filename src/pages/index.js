import { Card } from '../components/Сard.js';
import { initialCards, validationConfig } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from "../components/UserInfo.js";
import { editSelector, editOpenButton, editForm, addCardForm, addCardButton, section } from '../utils/constants.js';

import './index.css';


const validFormEdit = new FormValidator(validationConfig, editForm);
const validFormaddCard = new FormValidator(validationConfig, addCardForm);

validFormEdit.enableValidation();
validFormaddCard.enableValidation();

//модалка профиля
const userInfo = new UserInfo(editSelector);

editOpenButton.addEventListener("click", function() {
    editPopup.open();

    const userDescription = userInfo.getUserInfo();

    nameInput.value = userDescription.name;
    jobInput.value = userDescription.job;

    validFormEdit.resetErrorInput()
});

const editPopup = new PopupWithForm('.popup_type_edit', {
    submitHandler: (data) => {
        userInfo.setUserInfo(data);
        editPopup.close();
    }
})

//модалка добавления карточки 
addCardButton.addEventListener("click", () => {
    addCardPopup.open();
    validFormaddCard.resetErrorInput()
});

const addCardPopup = new PopupWithForm(".popup_type_add-card", {
    submitHandler: (data) => {
        const newData = {
            name: data.name,
            link: data.link,
        }

        const newCard = createCard(newData, '.card-template');
        defaultCardsList.prependItem(newCard);

        addCardPopup.close();
    }
});

//модалка картинки
const imgPopup = new PopupWithImage(".popup_type_img");

//добавление карточки
function createCard(data) {
    const card = new Card(data, '.card-template', {
        handleCardClick: (name, link) => {
            imgPopup.open(name, link)
        }
    });
    const cardElement = card.createCard();
    return cardElement // возваращаете готовую карточку

}

const defaultCardsList = new Section({
        items: initialCards,
        renderer: (item) => {
            const newCard = createCard(item, '.card-template');
            defaultCardsList.addItem(newCard);
        }
    },
    section
);
defaultCardsList.renderItems();