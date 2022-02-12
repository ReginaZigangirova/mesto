import { imgModal, modalImg, modaltitle, openModal } from './index.js'
export class Card {
    constructor(name, link, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
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
            this._setEventListeners();
            this._element.querySelector('.card__photo').src = this._link;
            this._element.querySelector('.card__photo').alt = this._name;
            this._element.querySelector('.card__tittle').textContent = this._name;

            return this._element;
        }
        // функция удаления карточки
    _deleteHandler() {
        this._element.querySelector('.card__delete').closest('.card__elements').remove();
    };
    //функция лайка
    _handleLikeButton() {
            this._element.querySelector('.card__like').classList.toggle('card__like_active');
        }
        //модалка 
    _imgHandler() {
        modalImg.src = this._link;
        modaltitle.textContent = this._name;
        modalImg.alt = this._name;
        openModal(imgModal);
    };
    //установка слушателей
    _setEventListeners() {
        this._element.querySelector('.card__delete').addEventListener('click', () => { this._deleteHandler() });
        this._element.querySelector('.card__like').addEventListener('click', () => { this._handleLikeButton() });
        this._element.querySelector('.card__photo').addEventListener('click', () => { this._imgHandler() });
    }

}