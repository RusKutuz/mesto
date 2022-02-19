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
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
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

const popups = document.querySelectorAll('.popup'); //Эта переменная используется для поиска открытого попапа в слушателе клавиатуры. Ответ куратора Наталья Дружинина: Все остальные слушатели на попап, а этот на документ

/* очистить форму */
function formReset(pop) {
  const form = pop.querySelector('.popup__form');
  const inputs = pop.querySelectorAll('.popup__input');
  const errors = pop.querySelectorAll('.popup__input-error');
  if (form) {
    form.reset();}
  errors.forEach(error => error.textContent = "");
  inputs.forEach(input => {
    if (input.classList.contains('popup__input_type_error')) {
      input.classList.remove('popup__input_type_error');
    }
  });
  
}

/* открыть попап */
function openPopup(pop) {
  pop.classList.add('popup_opened');
}

/* закрыть попап */
function closePopup(pop) {
  pop.classList.remove('popup_opened');
  formReset(pop);
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
function createCard(name, link) { 
  const newCard = templateCard.cloneNode(true);
  const picture = newCard.querySelector('.elements__picture');
  picture.src = link;
  picture.alt = name;
  newCard.querySelector('.elements__name').textContent = name;
  newCard.querySelector('.elements__trash').addEventListener('click', deleteCard);
  newCard.querySelector('.elements__like').addEventListener('click', likeActive);
  picture.addEventListener('click', openPopupPicture);
  return newCard; //возвращается созданная карточка 
  } 

/* добавить карточку в контейнер*/
function addCard(container, cardElement) {
  container.prepend(cardElement);
}

/* добавить карточки по умолчанию*/
initialCards.forEach((item) => addCard(cardsList, createCard(item.name, item.link)));

/* добавить карточку по сабмиту формы */
function submitAddCardForm(evt) {
  evt.preventDefault();
  addCard(cardsList, createCard(popupInputPlace.value, popupInputLink.value));
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
  popupImage.alt = evt.target.alt;
  popupDescription.textContent = evt.target.alt;
}

/* закрасить сердечко Лайк черным при нажатии и обратно */
function likeActive(event) {
  event.target.classList.toggle('elements__like_active');
}

/* закрыть попап по клику за границами попапа*/
function closePopupBorderOutside(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

/* закрыть попап по клику на кнопку Esc*/
function closePopupOnButtonEsc(event) {
  if (event.key == "Escape") {
    popups.forEach((pop) => {
      if (pop.classList.contains('popup_opened')) {
        closePopup(pop);
      }
    });
    
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
document.addEventListener('keydown', closePopupOnButtonEsc); //Ответ куратора Наталья Дружинина: Все остальные слушатели на попап, а этот на документ



