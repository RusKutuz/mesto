const initialCards = [
  {
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

const profileInfoEditButton = document.querySelector('.profile__edit-button');
const profileHeader = document.querySelector('.profile__header');
const profileProfession = document.querySelector('.profile__subscription');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupForm = popupEditProfile.querySelector('.popup__form');
const popupCloseButton = popupEditProfile.querySelector('.popup__close-icon');
const popupInputFieldName = popupEditProfile.querySelector('.popup__input_type_name');
const popupInputFieldProfession = popupEditProfile.querySelector('.popup__input_type_profession');

const cardsList = document.querySelector('.elements__grid');

const templateCard = document.querySelector('.template-card').content;

const addCardButton = document.querySelector('.profile__add-button');

const popupAddCard = document.querySelector('.popup_type_add-card');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close-icon');
const popupInputPlace = popupAddCard.querySelector('.popup__input_type_place');
const popupInputLink = popupAddCard.querySelector('.popup__input_type_link');
const popupAddCardForm = popupAddCard.querySelector('.popup__form');

const popupPicture = document.querySelector('.popup_type_picture');
const popupImage = popupPicture.querySelector('.popup__image');
const popupDescription = popupPicture.querySelector('.popup__description');
const popupPictureCloseButton = popupPicture.querySelector('.popup__close-icon');



/* открыть попап редактирования профиля и заполнить инпуты значениями со страницы */
function openPopup() {
    popupEditProfile.classList.add('popup_opened');
    popupInputFieldName.value = profileHeader.textContent;
    popupInputFieldProfession.value = profileProfession.textContent;
}

/* закрыть попап редактирования профиля*/
function closePopup() {
    popupEditProfile.classList.remove('popup_opened');
}

/* закрыть попап и заполнить данные на странице значениями введенными в форме */
function submitForm(evt) {
    evt.preventDefault();
    profileHeader.textContent = popupInputFieldName.value;
    profileProfession.textContent = popupInputFieldProfession.value;
    closePopup();
}

/* создать карточку которая будет на стартовой странице*/
function addCard(el) {
    let newCard = templateCard.cloneNode(true);
    let picture = newCard.querySelector('.elements__picture');
    picture.src = el.link;
    picture.alt = el.name;
    picture.addEventListener('click', openPopupPicture);
    newCard.querySelector('.elements__name').innerText = el.name;
    newCard.querySelector('.elements__trash').addEventListener('click', deleteCard);
    cardsList.appendChild(newCard);
}

/* добавить карточку на страницу по сабмиту формы и навесить обработчик события Лайк */
function submitAddCardForm(evt) {
  evt.preventDefault();
  let newCard = templateCard.cloneNode(true);
  let picture = newCard.querySelector('.elements__picture');
  picture.src = popupInputLink.value;
  picture.alt = popupInputPlace.value;
  picture.addEventListener('click', openPopupPicture);
  newCard.querySelector('.elements__name').innerText = popupInputPlace.value;
  newCard.querySelector('.elements__like').addEventListener('click', likeActive);
  newCard.querySelector('.elements__trash').addEventListener('click', deleteCard);
  cardsList.prepend(newCard);
  closePopupAddCard();
}

/* удалить карточку */
function deleteCard (evt) {
  evt.target.parentElement.remove();
}

/* открыть попап добавления карточки */
function openPopupAddCard(evt) {
  popupAddCard.classList.add('popup_opened');
  console.log(evt.target);
}

/* закрыть попап добавления карточки */
function closePopupAddCard() {
  popupAddCard.classList.remove('popup_opened');
}

/* открыть попап с картинкой */
function openPopupPicture(evt) {
  popupPicture.classList.add('popup_opened');
  popupImage.src = evt.target.src;
  popupDescription.innerText = evt.target.alt;
}

/* закрыть попап с картинкой */
function closePopupPicture() {
  popupPicture.classList.remove('popup_opened');
}

/* закрасить сердечко Лайк черным при нажатии и обратно */
function likeActive (event) {
  event.target.classList.toggle('elements__like_active');
}

/* добавить на страницу карточки по умолчанию */
initialCards.forEach(addCard);

/* добавить обработчики событий Лайк на все карточки загружаемые по умолчанию */
let likeButtons = document.querySelectorAll('.elements__like');
likeButtons.forEach((item) => {item.addEventListener('click', (event) => {
    (event.target).classList.toggle(('elements__like_active'));
});});

profileInfoEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupPictureCloseButton.addEventListener('click', closePopupPicture);
popupForm.addEventListener('submit', submitForm);
addCardButton.addEventListener('click', openPopupAddCard);
popupAddCardCloseButton.addEventListener('click', closePopupAddCard);
popupAddCardForm.addEventListener('submit', submitAddCardForm);













/* 
Сейчас закрытие вне окошка работает не совсем корректно - если щелкнуть в пределах окна, а отпустить мышку за пределами, 
то окно закроется, хотя не должно. Из-за этого могут возникнуть проблемы с выделением контента внутри инпутов - если 
при выделении вывести курсор за пределы окна попапа, то окошко свернется.

const popupOverlay = popup.querySelector('.popup__overlay');
popupOverlay.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        popup.classList.remove('popup_opened');
    }
});
*/