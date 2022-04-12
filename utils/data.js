 
export const profileInfoEditButton = document.querySelector('.profile__edit-button');
export const profileHeader = document.querySelector('.profile__header');
export const profileAbout = document.querySelector('.profile__subscription');
export const profileAvatarContainer = document.querySelector('.profile__avatar-link');
export const profileAvatar = document.querySelector('.profile__avatar');

export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
export const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close-icon');
export const popupInputFieldName = popupEditProfile.querySelector('.popup__input_type_name');
export const popupInputFieldAbout = popupEditProfile.querySelector('.popup__input_type_about');

export const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
export const popupEditAvatarForm = popupEditAvatar.querySelector('.popup__form');
export const popupEditAvatarCloseButton = popupEditAvatar.querySelector('.popup__close-icon');
export const popupInputFieldAvatar = popupEditAvatar.querySelector('.popup__input_type_avatar');



export const cardsContainer = document.querySelector('.elements__grid');

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
  errorSelector: '.popup__input-error',
  errorVisibleClass: 'popup__input-error_visible'
};


export const apiSettings = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: 'b551eaeb-19af-45c7-9088-803cc1768974',
    'Content-Type': 'application/json'
    },
};