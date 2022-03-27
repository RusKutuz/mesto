import {FormValidator} from './FormValidator.js';
import {Card} from './Card.js';
import {Section} from './Section.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
import {UserInfo} from './UserInfo.js';


import {
  initialCards, 
  validationConfig, 
  popupEditProfileForm, 
  popupAddCardForm, 
  cardsContainer,
  profileInfoEditButton,
  addCardButton,
  popupInputFieldName,
  popupInputFieldProfession,
  popupInputPlace,
  popupInputLink
} from './data.js';

const popupWithImage = new PopupWithImage('.popup_type_picture');
const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', submitFormEditProfile);
const popupAddCard = new PopupWithForm('.popup_type_add-card', submitAddCardForm);
const userInformation = new UserInfo({userNameSelector: '.profile__header', userDescriptionSelector: '.profile__subscription'});
popupWithImage.setEventListeners();


/* создать карточку */
const createCard = (data) => {
  const card = new Card (data, ".template-card", () => {popupWithImage.open(data.link, data.name);});
  const cardElement = card.generateCard();
  return cardElement;
};

/* добавить карточку в контейнер*/
function addCard(cardElement, container) {
  container.prepend(cardElement);
}

/* отрендерить карточку */
const renderCard = (data, container) => {
  const cardElement = createCard(data);
  addCard(cardElement, container);
};

/* добавить начальные карточки в разметку*/
const cardsSection = new Section({
  items: initialCards, 
  renderer: renderCard,},
 '.elements__grid'
);
cardsSection.renderItems();

/* добавить карточку по сабмиту формы */
function submitAddCardForm(evt) {
  evt.preventDefault();
  const cardData = {name: popupInputPlace.value, link: popupInputLink.value};
  renderCard(cardData, cardsContainer);
  popupAddCard.close();
}

/* валидировать форму редактирования профиля */
const editProfileFormValidation = new FormValidator(validationConfig, popupEditProfileForm);
editProfileFormValidation.enableValidation();

/* валидировать форму добавления карточки */
const addCardFormValidation = new FormValidator(validationConfig, popupAddCardForm);
addCardFormValidation.enableValidation();



/* открыть попап редактирования профиля и заполнить инпуты значениями со страницы */
function openPopupEditProfile() {
  popupEditProfile.open();
  popupEditProfile.setEventListeners();
  editProfileFormValidation.resetForm();
  editProfileFormValidation.toggleButtonState();
  
  const getInfo = userInformation.getUserInfo();
  popupInputFieldName.value = getInfo.userName;
  popupInputFieldProfession.value = getInfo.userDescription;
}

/* закрыть попап и заполнить данные на странице значениями введенными в форме */
function submitFormEditProfile(evt) {
  evt.preventDefault();
  popupEditProfile.close();
  userInformation.setUserInfo(popupEditProfile.inputValues);
}

/* открыть попап добавления карточки */
function openPopupAddCard() {
  popupAddCard.open();
  popupAddCard.setEventListeners();
  addCardFormValidation.resetForm();
  addCardFormValidation.toggleButtonState();
}

addCardButton.addEventListener('click', openPopupAddCard);
profileInfoEditButton.addEventListener('click', openPopupEditProfile);
 