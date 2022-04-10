import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';


import {
  validationConfig,
  apiSettings,
  popupEditProfileForm, 
  popupAddCardForm, 
  profileInfoEditButton,
  addCardButton,
  popupInputFieldName,
  popupInputFieldProfession,
  profileAvatar,
  profileAvatarLink,
  popupEditAvatarForm,
} from '../utils/data.js';

import '../pages/index.css'; // импорт главного файла стилей 



const popupWithImage = new PopupWithImage('.popup_type_picture');
popupWithImage.setEventListeners(); //Слушатели устанавливаются только один раз после создания экземпляра класса

const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', submitFormEditProfile);
popupEditProfile.setEventListeners();

const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', submitEditAvatarForm);
popupEditAvatar.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_type_add-card', submitAddCardForm);
popupAddCard.setEventListeners();

const popupDeleteCard = new PopupWithForm('.popup_type_delete-card', submitDeleteCardForm);
popupDeleteCard.setEventListeners();

const userInformation = new UserInfo({userNameSelector: '.profile__header', userDescriptionSelector: '.profile__subscription'});

const api = new Api(apiSettings);

let userProfileId;


/*запросить данные пользователя на сервере и добавить их на страницу*/
/*загрузить карточки с сервера и добавить на сайт*/
Promise.all([api.getUserInfo(), api.getCards()])
.then(([userData, cards]) => {
  userData.profession = userData.about;
  userInformation.setUserInfo(userData);
  profileAvatar.src = userData.avatar;
  userProfileId = userData._id;

  renderInintialCards(cards);
});



/* создать карточку */
function createCard(data) {
  data.userProfileId = userProfileId;
  const card = new Card (
    data, 
    ".template-card", 
    () => {popupWithImage.open(data.link, data.name);}, 
    (id) => {
    popupDeleteCard.open();
    popupDeleteCard.changeSubmitHandler(() => {
      api.deleteCard(id).then((res) => console.log(res));
      card.deleteCard();
      popupDeleteCard.close();
    } );},
    (id) => {
      if (card.isLiked()) {
      api.deleteLike(id)
      .then((res) => {
        card.setLikes(res.likes);
        });
    } else {
        api.setLike(id)
        .then((res) => {
          card.setLikes(res.likes);
      });
    }
  }
  );
    
  const cardElement = card.generateCard();
  return cardElement;
}


let cardsSection;

/* отрендерить карточку */
const renderCard = (data) => {
  const cardElement = createCard(data);
  cardsSection.addItem(cardElement);
};

/* добавить начальные карточки в разметку*/
const renderInintialCards = (data) => {
   cardsSection = new Section({
    items: data, 
    renderer: renderCard,},
   '.elements__grid'
  );
  cardsSection.renderItems();
};



  


/* добавить карточку по сабмиту формы */
function submitAddCardForm(data) {
  data.name = data.place; 
  popupAddCard.changeButtonNameOnPending('Сохранение...');
  api.setCard(data)
  .then((result) => {
    renderCard(result);
    popupAddCard.close();
  });
}

/* отправить аватар на сервер по сабмиту формы */
function submitEditAvatarForm(data) {
  data.avatar = data.link;
  popupEditAvatar.changeButtonNameOnPending('Сохранение...');
  api.setAvatar(data)
  .then((result) => {
    profileAvatar.src = result.avatar;
    popupEditAvatar.close();
  });
}

/* удалить карточку по сабмиту попапа */
function submitDeleteCardForm(id) {
  api.deleteCard(id);
  popupDeleteCard.close();
}

/* открыть попап добавления карточки */
function openPopupAddCard() {
  popupAddCard.changeButtonNameOnPending('Создать');
  addCardFormValidation.resetForm();
  addCardFormValidation.toggleButtonState();
  popupAddCard.open();
}



/* валидировать форму редактирования профиля */
const editProfileFormValidation = new FormValidator(validationConfig, popupEditProfileForm);
editProfileFormValidation.enableValidation();

/* валидировать форму редактирования аватара */
const editAvatarFormValidation = new FormValidator(validationConfig, popupEditAvatarForm);
editAvatarFormValidation.enableValidation();

/* валидировать форму добавления карточки */
const addCardFormValidation = new FormValidator(validationConfig, popupAddCardForm);
addCardFormValidation.enableValidation();

/* открыть попап редактирования профиля и заполнить инпуты значениями со страницы */
function openPopupEditProfile() {
  popupEditProfile.changeButtonNameOnPending('Сохранить');
  editProfileFormValidation.resetForm();
  const getInfo = userInformation.getUserInfo();
  popupInputFieldName.value = getInfo.userName;
  popupInputFieldProfession.value = getInfo.userDescription;
  editProfileFormValidation.toggleButtonState();
  popupEditProfile.open();
}

/* открыть попап редактирования аватара */
function openPopupEditAvatar() {
  popupEditAvatar.changeButtonNameOnPending('Сохранить');
  editAvatarFormValidation.resetForm();
  editAvatarFormValidation.toggleButtonState();
  popupEditAvatar.open();
}


/*сохранить на сервере отредактированные данные профиля*/
function sendProfileInfo(data) {
  api.setUserInfo(data)
  .then(() => {
    popupEditProfile.close();
  });
}


/* закрыть попап и заполнить данные на странице значениями введенными в форме */
function submitFormEditProfile(data) {
  popupEditProfile.changeButtonNameOnPending('Сохранение...');
  userInformation.setUserInfo(data);
  sendProfileInfo(data);
}



addCardButton.addEventListener('click', openPopupAddCard);
profileInfoEditButton.addEventListener('click', openPopupEditProfile);
profileAvatarLink.addEventListener('click', openPopupEditAvatar);


 