import { Card } from './Сard.js';
import { initialCards, validationConfig } from './utils.js';
import { FormValidator } from './FormValidator.js';
import Section from './Section.js'
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js'
import UserInfo from "./UserInfo.js";
import { editSelector, editOpenButton, editForm, addCardForm, addCardButton, addCardModal, section } from './utils.js';


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
            link: data.link,
            name: data.name,
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
    const card = new Card(data.name, data.link, '.card-template', {
        handleCardClick: (name, link) => {
            imgPopup.open(name, link)

        }
    });
    const cardElement = card.createCard();
    return cardElement // возваращаете готовую карточку
}

const renderPlaceCard = (data) => {
    section.prepend(createCard(data));
}

initialCards.forEach(renderPlaceCard);

const defaultCardsList = new Section({
        items: initialCards,
        renderer: (item) => {
            const newCard = createCard(item, '.card-template');
            defaultCardsList.addItem(newCard);
        }
    },
    section
);