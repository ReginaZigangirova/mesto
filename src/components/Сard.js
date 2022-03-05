export class Card {
    constructor(data, templateSelector, { handleCardClick }) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const photoTemplate = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card__elements')
            .cloneNode(true);

        return photoTemplate;
    }

    //создаем карточку 
    createCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.card__photo');
        this._cardImage.src = this._link;
        this._element.querySelector('.card__tittle').textContent = this._name;
        this._likeButton = this._element.querySelector('.card__like');
        this._setEventListeners();

        return this._element;
    }

    // функция удаления карточки
    _deleteHandler() {
        this._element.querySelector('.card__delete').closest('.card__elements').remove();
    };

    //функция лайка
    _handleLikeButton() {
        this._likeButton.classList.toggle('card__like_active');
    }

    //установка слушателей
    _setEventListeners() {
        this._element.querySelector('.card__delete').addEventListener('click', () => { this._deleteHandler() });
        this._likeButton.addEventListener('click', () => { this._handleLikeButton() });
        this._cardImage.addEventListener('click', () => { this._handleCardClick(this._name, this._link) });
    }

}