import { Card } from '../components/Сard.js';
import { validationConfig } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from "../components/UserInfo.js";
import { editSelector, editOpenButton, editForm, addCardForm, addCardButton, section, avatarOpenButton, avatarForm } from '../utils/constants.js';
import { api } from '../components/Api.js';
import './index.css';

let userId
Promise.all([api.getInitialCards(), api.getProfile()])
    .then(([cardList, res]) => {
        userId = res._id;
        userInfo.setUserInfo(res.name, res.about);
        userInfo.setUserAvatar(res.avatar);
        cardList.reverse()
        cardList.forEach(data => {
            const newData = createCard({
                name: data.name,
                link: data.link,
                likes: data.likes,
                id: data._id,
                userId: userId,
                ownerId: data.owner._id
            })

            defaultCardsList.addItem(newData)
        })
    })
    .catch((err) => { console.log(`Ошибка: ${err}`) })
    // api.getProfile()
    //     .then(res => {
    //         userInfo.setUserInfo(res.name, res.about, res.avatar)
    //         userId = res._id
    //     })
    // api.getInitialCards()
    //     .then(cardList => {
    //         cardList.forEach(data => {
    //             const newData = createCard({
    //                 name: data.name,
    //                 link: data.link,
    //                 likes: data.likes,
    //                 id: data._id,
    //                 userId: userId,
    //                 ownerId: data.owner._id
    //             })

//             defaultCardsList.addItem(newData)
//         })
//     })

//валидация
const validFormEdit = new FormValidator(validationConfig, editForm);
const validFormaddCard = new FormValidator(validationConfig, addCardForm);
const validFormAvatar = new FormValidator(validationConfig, avatarForm)
validFormEdit.enableValidation();
validFormaddCard.enableValidation();
validFormAvatar.enableValidation();

//модалка аватар
avatarOpenButton.addEventListener('click', () => {
    avatarPopup.open();
    validFormAvatar.resetErrorInput()
})


const avatarPopup = new PopupWithForm('.popup_type_avatar', {
        submitHandler: (res) => {
            api.setAvatar(res.avatar)
                .then(res => {
                    userInfo.setUserAvatar(res.avatar)
                })
            avatarPopup.close()
        }
    })
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
        editPopup.renderLoading(true)
        api.editProfile(res.name, res.about)
            .then(res => {
                userInfo.setUserInfo(res.name, res.about);
                editPopup.close();
            })

        .finally(() => { editPopup.renderLoading(false) })
    }
})

//модалка добавления карточки  
addCardButton.addEventListener("click", () => {
    addCardPopup.open();
    validFormaddCard.resetErrorInput()
});

const addCardPopup = new PopupWithForm(".popup_type_add-card", {
    submitHandler: (data) => {
        addCardPopup.renderLoading(true)
        api.addCard(data.name, data.link)
            .then(res => {
                const newData = {
                    name: res.name,
                    link: res.link,
                    likes: res.likes,
                    id: res._id,
                    userId: userId,
                    ownerId: res.owner._id
                }
                const newCard = createCard(newData);
                defaultCardsList.prependItem(newCard);
                addCardPopup.close();
            })
            .finally(() => { addCardPopup.renderLoading(false) })
    }

});
//модалка удаления 
const confirmPopup = new PopupWithForm(".popup_type_delete-confirm", {})

//модалка картинки 
const imgPopup = new PopupWithImage(".popup_type_img");
//добавление карточки 

function createCard(data) {
    const card = new Card(data, '.card-template', {
            handleCardClick: (name, link) => {
                imgPopup.open(name, link)
            }
        },
        (id) => {
            confirmPopup.open()
            confirmPopup.cangeSubmitHandler({
                newSubmitHandler: () => {
                    confirmPopup.renderLoading(true)
                    api.deleteCard(id)
                        .then(res => {
                            card.deleteHandler()
                            confirmPopup.close()
                        })
                        .finally(() => { confirmPopup.renderLoading(false) })
                }
            })
        },
        (id) => {
            if (card.isLiked()) {
                api.deleteLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
            } else {
                api.addLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
            }

        },

    );
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