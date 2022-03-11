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
} from './Data.js';




/* валидировать формы */
const editProfileFormValidation = new FormValidator(validationConfig, popupEditProfileForm);
const addCardFormValidation = new FormValidator(validationConfig, popupAddCardForm);
editProfileFormValidation.enableValidation();
addCardFormValidation.enableValidation();

/* закрыть попап по клику на кнопку Esc*/
export const closePopupOnButtonEsc = function(event) {
  if (event.key == "Escape") {
    popups.forEach((pop) => {
      if (pop.classList.contains('popup_opened')) {
        closePopup(pop);
      }
    });
    
  }
};

/* добавить карточки в разметку*/
initialCards.forEach((data) => {
  const card = new Card(data, '.template-card', openPopup);
  const cardElement = card.generateCard();
  document.querySelector('.elements__grid').prepend(cardElement);
});

/* очистить форму */
function resetPopupForm(pop) {
  const form = pop.querySelector('.popup__form');
  if (form) {
    const inputs = pop.querySelectorAll('.popup__input');
    const errors = pop.querySelectorAll('.popup__input-error');
    const submitButton = pop.querySelector('.popup__submit-button');
    form.reset();
    errors.forEach(error => error.textContent = "");
    inputs.forEach(input => {
      if (input.classList.contains('popup__input_type_error')) {
          input.classList.remove('popup__input_type_error');
      }
    });
    if (!submitButton.classList.contains('popup__submit-button_disabled')) {
        submitButton.classList.add('popup__submit-button_disabled');
    }
  }
}
 
/* открыть попап */
function openPopup(pop) {
  resetPopupForm(pop);
  pop.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnButtonEsc);
}

/* закрыть попап */
function closePopup(pop) {
  pop.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnButtonEsc);
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


/* добавить карточку в контейнер*/
function addCard(container, cardElement) {
  container.prepend(cardElement);
}


/* добавить карточку по сабмиту формы */
function submitAddCardForm(evt) {
  evt.preventDefault();
  const card = new Card ({name: popupInputPlace.value, link: popupInputLink.value}, ".template-card");
  const cardElement = card.generateCard();
  console.log(cardElement);
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
popupEditProfile.addEventListener('mousedown', closePopupBorderOutside);
popupAddCard.addEventListener('mousedown', closePopupBorderOutside);
popupPicture.addEventListener('mousedown', closePopupBorderOutside);


