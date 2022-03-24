export class Card {
    constructor(data, templateSelector, { handleCardClick }, handleDeleteClick, handleLikeClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data.id;
        this._userId = data.userId;
        this._ownerId = data.ownerId;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    }

    _getTemplate() {
        const photoTemplate = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card__elements')
            .cloneNode(true);

        return photoTemplate;
    }

    isLiked() {
            const userHasLikedCard = this._likes.find(user => user._id === this._userId)

            return userHasLikedCard
        }
        //кол-во лайков 
    setLikes(newLikes) {
        this._likes = newLikes
        const likeCountElement = this._element.querySelector('.card__like-count')
        likeCountElement.textContent = this._likes.length

        //const userHasLikedCard = this._likes.find(user => user._id === this._userId)
        if (this.isLiked()) {
            this._addLike()
        } else {
            this._removeLike()
        }
    }

    _addLike() {
        this._likeButton.classList.add('card__like_active');
    }
    _removeLike() {
            this._likeButton.classList.remove('card__like_active');
        }
        //создаем карточку 
    createCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.card__photo');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.card__tittle').textContent = this._name;
        this._likeButton = this._element.querySelector('.card__like');
        this._setEventListeners();
        this.setLikes(this._likes);
        if (this._ownerId !== this._userId) {
            this._element.querySelector('.card__delete').style.display = 'none'
        }

        return this._element;
    }


    //функция удаления карточки
    deleteHandler() {
        this._element.querySelector('.card__delete').closest('.card__elements').remove();
    };



    //установка слушателей
    _setEventListeners() {
        this._element.querySelector('.card__delete').addEventListener('click', () => { this._handleDeleteClick(this._id) });
        this._likeButton.addEventListener('click', () => { this._handleLikeClick(this._id) });
        this._cardImage.addEventListener('click', () => { this._handleCardClick(this._name, this._link) });
    }

}