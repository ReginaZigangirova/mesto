import { Card } from '../components/Сard.js';
import { initialCards, validationConfig } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from "../components/UserInfo.js";
import { editSelector, editOpenButton, editForm, addCardForm, addCardButton, section } from '../utils/constants.js';
import { api } from '../components/Api.js';
import './index.css';

api.getProfile()
    .then(res => {
        console.log('ответ', res)
        userInfo.setUserInfo(res.name, res.about)
    })

api.getInitialCards()
    .then(cardList => {
        cardList.forEach(data => {
            const newData = {
                name: data.name,
                link: data.link
            }
            defaultCardsList.addItem(newData)
        })
    })

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

        const newCard = createCard(newData);
        defaultCardsList.prependItem(newCard); //section.addItem(card) 48.04

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
        items: [],
        renderer: (item) => {
            const newCard = createCard(item);
            defaultCardsList.addItem(newCard);
        }
    },
    section
);
defaultCardsList.renderItems();