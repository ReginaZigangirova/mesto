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

// Promise.all([api.getProfile(), api.getInitialCards()])
//     .then(([res, cardList]) => {
//         userInfo.setUserInfo(res.name, res.about);
//         cardList.forEach(data => {
//             const newData = createCard({
//                 name: data.name,
//                 link: data.link,
//                 likes: data.likes,
//                 //id: data._id
//             })
//             defaultCardsList.addItem(newData)
//         })
//     })
//     .catch(console.log);

api.getProfile()
    .then(res => {
        userInfo.setUserInfo(res.name, res.about)
    })

api.getInitialCards()
    .then(cardList => {
        cardList.forEach(data => {
            const newData = createCard({
                name: data.name,
                link: data.link,
                likes: data.likes,
                id: data._id
            })
            defaultCardsList.addItem(newData)
        })
    })

//валидация
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
    jobInput.value = userDescription.about;

    validFormEdit.resetErrorInput()
});

const editPopup = new PopupWithForm('.popup_type_edit', {
        submitHandler: (res) => {
            api.editProfile(res.name, res.about)
                .then(() => {
                    userInfo.setUserInfo(res.name, res.about);
                    editPopup.close();
                })

        }

    })
    //модалка добавления карточки 
addCardButton.addEventListener("click", () => {
    addCardPopup.open();
    validFormaddCard.resetErrorInput()
});

//модалка добавления карточки 

const addCardPopup = new PopupWithForm(".popup_type_add-card", {
    submitHandler: (data) => {
        api.addCard(data)
            .then(res => {
                defaultCardsList.addItem(res)
                const newCard = createCard(newData);
                defaultCardsList.prependItem(newCard);

                addCardPopup.close();
            })
    }
});

//модалка удаления карточки
const confirmPopup = new PopupWithForm(".popup_type_delete-confirm");
//confirmPopup.setEventListeners()

//модалка картинки
const imgPopup = new PopupWithImage(".popup_type_img");

//добавление карточки
function createCard(data) {
    const card = new Card(data, '.card-template', {
            handleCardClick: (name, link) => {
                imgPopup.open(name, link)
            },
        },
        (id) => {
            //console.log(id)
            confirmPopup.open()
            confirmPopup.cangeSubmitHandler(() => {
                //console.log(id)
                api.deleteCard(id)
                    .then(res => {
                        console.log(res)
                        card.deleteHandler()
                        confirmPopup.close()
                    })
            })
        }
    )
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