import {FormValidator} from './FormValidator.js';
import {Card} from './Card.js';
import {
  initialCards, 
  validationConfig, 
  popupEditProfileForm, 
  popupAddCardForm, 
  cardsList,
  profileInfoEditButton,
  popupEditProfileCloseButton,
  popupPictureCloseButton,
  addCardButton,
  popups,
  popupAddCardCloseButton,
  popupEditProfile,
  popupAddCard,
  popupPicture,
  popupInputFieldName,
  profileHeader,
  popupInputFieldProfession,
  profileProfession,
  popupInputPlace,
  popupInputLink
} from './data.js';

/* валидировать форму редактирования профиля */
const editProfileFormValidation = new FormValidator(validationConfig, popupEditProfileForm);
editProfileFormValidation.enableValidation();

/* валидировать форму добавления карточки */
const addCardFormValidation = new FormValidator(validationConfig, popupAddCardForm);
addCardFormValidation.enableValidation();

/* создать новую карточку */
function createNewCard(data, template) {
  const card = new Card(data, template, openPopup);
  const cardElement = card.generateCard();
  return cardElement;
}

/* добавить начальные карточки в разметку*/
initialCards.forEach((data) => {
  const cardElement = createNewCard(data, '.template-card');
  document.querySelector('.elements__grid').prepend(cardElement);
});



/* открыть попап */
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnButtonEsc);
}

/* закрыть попап */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnButtonEsc);
}

/* закрыть попап по клику на кнопку Esc*/
export const closePopupOnButtonEsc = function(event) {
  if (event.key == "Escape") {
    popups.forEach((popup) => {
      if (popup.classList.contains('popup_opened')) {
        closePopup(popup);
      }
    });
    
  }
};


/* открыть попап редактирования профиля и заполнить инпуты значениями со страницы */
function openPopupEditProfile() {
  openPopup(popupEditProfile);
  editProfileFormValidation.resetForm();
  editProfileFormValidation.toggleButtonState();
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
  addCardFormValidation.resetForm();
  addCardFormValidation.toggleButtonState();
}


/* добавить карточку в контейнер*/
function addCard(container, cardElement) {
  container.prepend(cardElement);
}


/* добавить карточку по сабмиту формы */
function submitAddCardForm(evt) {
  evt.preventDefault();
  const cardElement = createNewCard({name: popupInputPlace.value, link: popupInputLink.value}, ".template-card");
  addCard(cardsList, cardElement);
  closePopup(popupAddCard);
}
  
/* закрыть попап по клику за границами попапа*/
function closePopupBorderOutside(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

profileInfoEditButton.addEventListener('click', openPopupEditProfile);
popupEditProfileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));
popupPictureCloseButton.addEventListener('click', () => closePopup(popupPicture));
popupEditProfileForm.addEventListener('submit', submitForm);
addCardButton.addEventListener('click', openPopupAddCard);
popupAddCardCloseButton.addEventListener('click', () => closePopup(popupAddCard));
popupAddCardForm.addEventListener('submit', submitAddCardForm);
popups.forEach((popup) => {
  popup.addEventListener('mousedown', closePopupBorderOutside);
});
