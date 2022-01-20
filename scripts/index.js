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
const imgModal = document.querySelector('.popup_type_img');
const imgModalCloseButton = imgModal.querySelector('.popup__close');
const modalImg = document.querySelector('.popup__img');
const modaltitle = document.querySelector('.popup__title');

//карточки
const initialCards = [{
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

const section = document.querySelector('.card');
const cardTemplate = document.querySelector('.card-template').content;
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputCardLink = document.querySelector('.popup__input_type_card-link');

//функция открытия модалок
function toggleModal(modal) {
    modal.classList.toggle('popup_opened');
    document.addEventListener("keydown", closeOnEsc);
}

//закрытиe модалок на Overlay 
popups.forEach((modal) => {
    modal.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains("popup_opened")) {
            toggleModal(modal)
        }
    })
})

// закрытие модалок на Esc
function closeOnEsc(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
        const modalOpened = document.querySelector('.popup_opened');
        toggleModal(modalOpened);
    }
}

function toggleOpenModal() {
    toggleModal(editModal);

}

//открытие модалки профиля
editOpenButton.addEventListener('click', function() {
        toggleModal(editModal);
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent;
        resetErrorInput(editForm, validationConfig);
    })
    //закрытие модалки профиля
editCloseButton.addEventListener('click', function() {
        toggleModal(editModal);

    })
    //открытие модалки добавления карточки
addCardButton.addEventListener('click', function() {
    toggleModal(addCardModal);
    addCardForm.reset();
    resetErrorInput(addCardForm, validationConfig);
});
//закрытие модалки добавления карточки
addCardCloseButton.addEventListener('click', function() {
    toggleModal(addCardModal);

});


//форма профиля
editForm.addEventListener('submit', function formSubmitEditHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    toggleModal(editModal);
})

//функция удаления карточки
function deleteHandler(e) {
    e.target.closest('.card__elements').remove()
}
//функция лайка
function likeHandler(evt) {
    evt.target.classList.toggle('card__like_active');
}

function createCard(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardPhoto = cardElement.querySelector('.card__photo');
    const cardTitle = cardElement.querySelector('.card__tittle');
    const deleteButton = cardElement.querySelector('.card__delete');
    const likeButton = cardElement.querySelector('.card__like');

    cardTitle.textContent = cardData.name;
    cardPhoto.src = cardData.link;
    cardPhoto.alt = cardData.name;
    deleteButton.addEventListener('click', deleteHandler);
    likeButton.addEventListener("click", likeHandler);

    cardPhoto.addEventListener('click', function imgHandler() {
        toggleModal(imgModal);
        modalImg.src = cardData.link;
        modaltitle.textContent = cardData.name;
        modalImg.alt = cardData.name;

    })
    return cardElement;
}
const renderPlaceCard = (data) => {
    const card = createCard(data);
    section.prepend(card);
}

imgModalCloseButton.addEventListener('click', function() {
    toggleModal(imgModal);
})

initialCards.forEach(renderPlaceCard);

addCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    renderPlaceCard({
        name: inputCardName.value,
        link: inputCardLink.value
    })
    toggleModal(addCardModal);
})