export const initialCards = [
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
  
export const profileInfoEditButton = document.querySelector('.profile__edit-button');
export const profileHeader = document.querySelector('.profile__header');
export const profileProfession = document.querySelector('.profile__subscription');

export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
export const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close-icon');
export const popupInputFieldName = popupEditProfile.querySelector('.popup__input_type_name');
export const popupInputFieldProfession = popupEditProfile.querySelector('.popup__input_type_profession');

export const cardsList = document.querySelector('.elements__grid');

export const addCardButton = document.querySelector('.profile__add-button');

export const popupAddCard = document.querySelector('.popup_type_add-card');
export const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close-icon');
export const popupInputPlace = popupAddCard.querySelector('.popup__input_type_place');
export const popupInputLink = popupAddCard.querySelector('.popup__input_type_link');
export const popupAddCardForm = popupAddCard.querySelector('.popup__form');

export const popupPicture = document.querySelector('.popup_type_picture');
export const popupImage = popupPicture.querySelector('.popup__image');
export const popupDescription = popupPicture.querySelector('.popup__description');
export const popupPictureCloseButton = popupPicture.querySelector('.popup__close-icon');

export const popups = document.querySelectorAll('.popup'); 

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

