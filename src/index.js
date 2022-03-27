import {FormValidator} from '../scripts/FormValidator.js';
import {Card} from '../scripts/Card.js';
import {Section} from '../scripts/Section.js';
import {PopupWithImage} from '../scripts/PopupWithImage.js';
import {PopupWithForm} from '../scripts/PopupWithForm.js';
import {UserInfo} from '../scripts/UserInfo.js';


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
} from '../scripts/data.js';

import Close_Icon from '../images/Close_Icon.svg';
import Custoue from '../images/Custoue.jpg';
import Dombai from '../images/Dombai.jpg';
import Gora_Elbrus from '../images/Gora_Elbrus.jpg';
import Karachaevsk from '../images/Karachaevsk.jpg';
import Like_active from '../images/Like_active.svg';
import Like from '../images/Like.svg';
import Logo_dark from '../images/Logo_dark.svg';
import Logo from '../images/Logo.svg';
import Pencil from '../images/Pencil.svg';
import Plus from '../images/Plus.svg';
import Trash from '../images/Trash.svg';

import InterBlack from '../vendor/fonts/Inter-Black.woff';
import InterBlack2 from '../vendor/fonts/Inter-Black.woff2';
import InterMedium from '../vendor/fonts/Inter-Medium.woff';
import InterMedium2 from '../vendor/fonts/Inter-Medium.woff2';
import InterRegular from '../vendor/fonts/Inter-Regular.woff';
import InterRegular2 from '../vendor/fonts/Inter-Regular.woff2';

import '../pages/index.css'; // добавьте импорт главного файла стилей 

const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: 'Close_Icon', image: close_Icon },
  { name: 'Custoue', image: custoue },
  { name: 'Dombai', image: dombai },
  { name: 'Gora_Elbrus', image: gora_Elbrus },
  { name: 'Karachaevsk', image: karachaevsk },
  { name: 'Like_active', image: like_active },
  { name: 'Like', image: like },
  { name: 'Logo_dark', image: logo_dark },
  { name: 'Logo', image: logo },
  { name: 'Pencil', image: pencil },
  { name: 'Plus', image: plus },
  { name: 'Trash', image: trash },
  { name: 'InterBlack', font: interBlack },
  { name: 'InterBlack2', font: interBlack2 },
  { name: 'InterMedium', font: interMedium },
  { name: 'InterMedium2', font: interMedium2 },
  { name: 'InterRegular', font: interRegular },
  { name: 'InterRegular2', font: interRegular2 },
]; 

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
 