/* карточки */
export class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteCard,
    handleSwitchLike
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likesNumber = data.likes.length;
    this._templateSelector = templateSelector;
    this._data = data;
    this._id = data._id;
    this._userProfileId = data.userProfileId;
    this._cardOwnerId = data.owner._id;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleSwitchLike = handleSwitchLike;
  }
  /* клонировать карточку из темплета */
  _getTemplate() {
    this._cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);
  }
  /* навесить слушатели */
  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".elements__like");
    this._deleteButton = this._cardElement.querySelector(".elements__trash");
    this._cardImage = this._cardElement.querySelector(".elements__picture");
    this._likeButton.addEventListener("click", () =>
      this._handleSwitchLike(this._id)
    );
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCard(this._id)
    );
    this._cardImage.addEventListener("click", () => this._handleCardClick());
  }

  isLiked() {
    const likeStatus = this._likes.find(
      (user) => user._id === this._userProfileId
    );
    return likeStatus;
  }

  setLikesNumber(data) {
    this._likesNumberElement.textContent = data.length;
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    this.setLikesNumber(newLikes);
    if (this.isLiked()) {
      this.fillLike();
    } else {
      this.clearLike();
    }
  }

  /* закрасить сердечко Лайк */
  fillLike() {
    this._likeButton.classList.add("elements__like_active");
  }

  /* очистить сердечко Лайк */
  clearLike() {
    this._likeButton.classList.remove("elements__like_active");
  }


  /* удалить карточку */
  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  /* создать новую карточку */
  generateCard() {
    this._getTemplate();
    this._setEventListeners();
    this._likesNumberElement = this._cardElement.querySelector(".elements__like-number");
    this._cardElement.querySelector(".elements__picture").src = this._link;
    this._cardElement.querySelector(".elements__picture").alt = this._name;
    this._cardElement.querySelector(".elements__name").textContent = this._name;
    this._cardElement.querySelector(".elements__like-number").textContent =
      this._likesNumber;
    if (this._cardOwnerId !== this._userProfileId) {
      this._cardElement
        .querySelector(".elements__trash")
        .classList.add("elements__trash_disabled");
    }
    if (this._likes.find((user) => user._id === this._userProfileId)) {
      this.fillLike();
    }
    return this._cardElement;
  }
}



 /* _openPopupDeleteCard() {
    const popupDeleteCard = document.querySelector(".popup_type_delete-card");
    popupDeleteCard.classList.add("popup_opened");
  }
*/