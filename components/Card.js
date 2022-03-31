/* карточки */
export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;

    }
    /* клонировать карточку из темплета */
    _getTemplate() {
        this._cardElement = document.querySelector(this._templateSelector).content.querySelector('.elements__element').cloneNode(true);
        
    }
    /* навесить слушатели */
    _setEventListeners() {
        this._likeButton = this._cardElement.querySelector('.elements__like');
        this._deleteButton = this._cardElement.querySelector('.elements__trash');
        this._cardImage = this._cardElement.querySelector('.elements__picture');
        this._likeButton.addEventListener('click', () => this._likeActive());
        this._deleteButton.addEventListener('click', () => this._deleteCard());
        this._cardImage.addEventListener('click', () => this._handleCardClick());
    }

    /* закрасить сердечко Лайк черным при нажатии и обратно */
    _likeActive() {
        this._likeButton.classList.toggle('elements__like_active');
    }

    /* удалить карточку */
    _deleteCard() {
        this._cardElement.remove();
    }

    

    /* создать новую карточку */
    generateCard() {
        this._getTemplate();
        this._setEventListeners();
        this._cardElement.querySelector('.elements__picture').src = this._link;
        this._cardElement.querySelector('.elements__picture').alt = this._name;
        this._cardElement.querySelector('.elements__name').textContent = this._name;
        return this._cardElement;
    }
}




