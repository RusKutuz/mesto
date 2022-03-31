import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';


import {
  initialCards, 
  validationConfig, 
  popupEditProfileForm, 
  popupAddCardForm, 
  profileInfoEditButton,
  addCardButton,
  popupInputFieldName,
  popupInputFieldProfession,
} from '../components/data.js';

import '../pages/index.css'; // импорт главного файла стилей 

const popupWithImage = new PopupWithImage('.popup_type_picture');
popupWithImage.setEventListeners(); //Слушатели устанавливаются только один раз после создания экземпляра класса
const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', submitFormEditProfile);
popupEditProfile.setEventListeners();
const popupAddCard = new PopupWithForm('.popup_type_add-card', submitAddCardForm);
popupAddCard.setEventListeners();
const userInformation = new UserInfo({userNameSelector: '.profile__header', userDescriptionSelector: '.profile__subscription'});


/* отрендерить карточку */
const renderCard = (data) => {
  const cardElement = createCard(data);
  cardsSection.addItem(cardElement);
};


/* добавить начальные карточки в разметку*/
const cardsSection = new Section({
  items: initialCards, 
  renderer: renderCard,},
 '.elements__grid'
);
cardsSection.renderItems();

/* добавить карточку по сабмиту формы */
function submitAddCardForm(data) {
  data.name = data.place; 
  renderCard(data);
  popupAddCard.close();
}



/* открыть попап добавления карточки */
function openPopupAddCard() {
  addCardFormValidation.resetForm();
  addCardFormValidation.toggleButtonState();
  popupAddCard.open();
}



/* создать карточку */
function createCard(data) {
  const card = new Card (data, ".template-card", () => {popupWithImage.open(data.link, data.name);});
  const cardElement = card.generateCard();
  return cardElement;
}


/* валидировать форму редактирования профиля */
const editProfileFormValidation = new FormValidator(validationConfig, popupEditProfileForm);
editProfileFormValidation.enableValidation();

/* валидировать форму добавления карточки */
const addCardFormValidation = new FormValidator(validationConfig, popupAddCardForm);
addCardFormValidation.enableValidation();



/* открыть попап редактирования профиля и заполнить инпуты значениями со страницы */
function openPopupEditProfile() {
  editProfileFormValidation.resetForm();
  editProfileFormValidation.toggleButtonState();
  const getInfo = userInformation.getUserInfo();
  popupInputFieldName.value = getInfo.userName;
  popupInputFieldProfession.value = getInfo.userDescription;
  popupEditProfile.open();
}

/* закрыть попап и заполнить данные на странице значениями введенными в форме */
function submitFormEditProfile(data) {
  userInformation.setUserInfo(data);
  popupEditProfile.close();
}



addCardButton.addEventListener('click', openPopupAddCard);
profileInfoEditButton.addEventListener('click', openPopupEditProfile);



