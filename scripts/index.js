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
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close-icon');
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


/* открыть попап */
function openPopup(pop) {
  pop.classList.add('popup_opened');
}

/* закрыть попап */
function closePopup(pop) {
  pop.classList.remove('popup_opened');
}

/* закрыть попап добавления карточки */
function closePopupAddCard() {
  closePopup(popupAddCard);
}

/* закрыть попап редактирования профиля */
function closePopupEditProfile() {
  closePopup(popupEditProfile);
}

/* открыть попап редактирования профиля и заполнить инпуты значениями со страницы */
function openPopupEditProfile() {
  openPopup(popupEditProfile);
  popupInputFieldName.value = profileHeader.textContent;
  popupInputFieldProfession.value = profileProfession.textContent;
}

/* закрыть попап и заполнить данные на странице значениями введенными в форме */
function submitForm(evt) {
  evt.preventDefault();
  profileHeader.textContent = popupInputFieldName.value;
  profileProfession.textContent = popupInputFieldProfession.value;
  closePopup(popupEditProfile);
}

/* открыть попап добавления карточки */
function openPopupAddCard() {
  openPopup(popupAddCard);
}

/* создать новую карточку */
let newCard;
function cloneCardFromTemplate() {
  newCard = templateCard.cloneNode(true);
  return newCard;
}

/* добавить карточку на страницу*/
function addCard(item) {
  cloneCardFromTemplate();
  const picture = newCard.querySelector('.elements__picture');
  picture.src = item.link;
  picture.alt = item.name;
  newCard.querySelector('.elements__name').innerText = item.name;
  newCard.querySelector('.elements__trash').addEventListener('click', deleteCard);
  newCard.querySelector('.elements__like').addEventListener('click', likeActive);
  picture.addEventListener('click', openPopupPicture);
  cardsList.prepend(newCard);
}

initialCards.forEach(addCard);

function submitAddCardForm(evt) {
  evt.preventDefault();
  let item = {};
  item.link = popupInputLink.value;
  item.name = popupInputPlace.value;
  addCard(item);
  closePopup(popupAddCard);
}

/* добавить карточку на страницу*/
function addCard2(el) {
  cloneCardFromTemplate();
  const picture = newCard.querySelector('.elements__picture');
  picture.src = el.link;
  picture.alt = el.name;
  picture.addEventListener('click', openPopupPicture);
  newCard.querySelector('.elements__name').innerText = el.name;
  newCard.querySelector('.elements__trash').addEventListener('click', deleteCard);
  newCard.querySelector('.elements__like').addEventListener('click', likeActive);
  cardsList.prepend(newCard);
}

/* добавить карточку на страницу по сабмиту формы и навесить обработчик события Лайк */
function submitAddCardForm2(evt) {
  evt.preventDefault();
  cloneCardFromTemplate();
  let picture = newCard.querySelector('.elements__picture');
  picture.src = popupInputLink.value;
  picture.alt = popupInputPlace.value;
  picture.addEventListener('click', openPopupPicture);
  newCard.querySelector('.elements__name').innerText = popupInputPlace.value;
  newCard.querySelector('.elements__like').addEventListener('click', likeActive);
  newCard.querySelector('.elements__trash').addEventListener('click', deleteCard);
  cardsList.prepend(newCard);
  closePopup(popupAddCard);
}

/* удалить карточку */
function deleteCard (evt) {
  evt.target.parentElement.remove();
}

/* открыть попап с картинкой */
function openPopupPicture(evt) {
  openPopup(popupPicture);
  popupImage.src = evt.target.src;
  popupDescription.innerText = evt.target.alt;
}

/* закрыть попап с картинкой */
function closePopupPicture() {
  closePopup(popupPicture);
}

/* закрасить сердечко Лайк черным при нажатии и обратно */
function likeActive(event) {
  event.target.classList.toggle('elements__like_active');
}

/* добавить на страницу карточки по умолчанию */
//initialCards.forEach(addCard);




profileInfoEditButton.addEventListener('click', openPopupEditProfile);
popupEditProfileCloseButton.addEventListener('click', closePopupEditProfile);
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