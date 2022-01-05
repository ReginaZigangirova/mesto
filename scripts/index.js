//модалка профиля
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
const imgModalButton = imgModal.querySelector('.popup__close');
const modalImg = document.querySelector('.popup__img')
const modaltitle = document.querySelector('.popup__title')

function toggleModal(modal) {
    modal.classList.toggle('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function toggleEditModal() {
    editModal.classList.toggle('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

//открытие модалки профиля
editOpenButton.addEventListener('click', function() {
        toggleModal(editModal)
    })
    //закрытие модалки профиля
editCloseButton.addEventListener('click', function() {
        toggleModal(editModal)
    })
    //открытие модалки добавления карточки
addCardButton.addEventListener('click', function() {
    toggleModal(addCardModal)
});
//закрытие модалки добавления карточки
addCardCloseButton.addEventListener('click', function() {
    toggleModal(addCardModal)
    addCardForm.reset()
});

//форма профиля
editForm.addEventListener('submit', function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    editModal.classList.remove('popup_opened');
})

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

function deleteHandler(e) {
    e.target.closest('.card__elements').remove()
}

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
    deleteButton.addEventListener('click', deleteHandler);
    likeButton.addEventListener("click", likeHandler);

    cardPhoto.addEventListener('click', function imgHandler() {
        toggleModal(imgModal)
        modalImg.src = cardData.link;
        modaltitle.textContent = cardData.name;
    })


    section.prepend(cardElement);
}
imgModalButton.addEventListener('click', function() {
    toggleModal(imgModal)
})

initialCards.forEach(createCard);

addCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    createCard({
        name: inputCardName.value,
        link: inputCardLink.value
    })
    toggleModal(addCardModal)
})