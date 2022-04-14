import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

import {
  validationConfig,
  apiSettings,
  popupEditProfileForm,
  popupAddCardForm,
  profileInfoEditButton,
  addCardButton,
  popupInputFieldName,
  popupInputFieldAbout,
  profileAvatar,
  profileAvatarContainer,
  popupEditAvatarForm,
} from "../utils/data.js";

import "../pages/index.css"; // импорт главного файла стилей

const popupWithImage = new PopupWithImage(".popup_type_picture");
popupWithImage.setEventListeners(); //Слушатели устанавливаются только один раз после создания экземпляра класса

const popupEditProfile = new PopupWithForm(
  ".popup_type_edit-profile",
  submitFormEditProfile
);
popupEditProfile.setEventListeners();

const popupEditAvatar = new PopupWithForm(
  ".popup_type_edit-avatar",
  submitEditAvatarForm
);
popupEditAvatar.setEventListeners();

const popupAddCard = new PopupWithForm(
  ".popup_type_add-card",
  submitAddCardForm
);
popupAddCard.setEventListeners();

const popupDeleteCard = new PopupWithConfirmation(".popup_type_delete-card");
popupDeleteCard.setEventListeners();

const userInformation = new UserInfo({
  userNameSelector: ".profile__header",
  userDescriptionSelector: ".profile__subscription",
  profileAvatarSelector: ".profile__avatar",
});

const api = new Api(apiSettings);

let userProfileId;

/*запросить данные пользователя на сервере и добавить их на страницу*/
/*загрузить карточки с сервера и добавить на сайт*/
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    userInformation.setUserInfo(userData);
    userInformation.setAvatar(userData);
    userProfileId = userData._id;
    renderInintialCards(cards);
  })
  .catch((err) => {
    console.log(err);
  });

/* создать карточку */
function createCard(data) {
  data.userProfileId = userProfileId;
  const card = new Card(
    data,
    ".template-card",
    /*открыть попап с картинкой*/
    () => {
      popupWithImage.open(data.link, data.name);
    },
    /*удалить карточку*/
    () => {
      popupDeleteCard.open();
      popupDeleteCard.changeSubmitHandler(() => {
        popupDeleteCard.changeButtonName("Сохранение...");
        api
          .deleteCard(data._id)
          .then(() => {
            card.deleteCard();
            popupDeleteCard.close();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            popupDeleteCard.changeButtonName("Да");
          });
      });
    },
    /*поставить лайк*/
    () => {
      if (card.isLiked()) {
        api
          .deleteLike(card._id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .setLike(card._id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
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
  cardsSection = new Section(
    {
      items: data,
      renderer: renderCard,
    },
    ".elements__grid"
  );
  cardsSection.renderItems();
};

/* добавить карточку по сабмиту формы */
function submitAddCardForm(data) {
  data.name = data.place;
  popupAddCard.changeButtonName("Сохранение...");
  api
    .setCard(data)
    .then((result) => {
      renderCard(result);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddCard.changeButtonName("Создать");
    });
}

/* отправить аватар на сервер по сабмиту формы */
function submitEditAvatarForm(data) {
  popupEditAvatar.changeButtonName("Сохранение...");
  api
    .setAvatar(data)
    .then((result) => {
      userInformation.setAvatar(result);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatar.changeButtonName("Сохранить");
    });
}

/* открыть попап добавления карточки */
function openPopupAddCard() {
  addCardFormValidation.resetForm();
  popupAddCard.open();
}

/* валидировать форму редактирования профиля */
const editProfileFormValidation = new FormValidator(
  validationConfig,
  popupEditProfileForm
);
editProfileFormValidation.enableValidation();

/* валидировать форму редактирования аватара */
const editAvatarFormValidation = new FormValidator(
  validationConfig,
  popupEditAvatarForm
);
editAvatarFormValidation.enableValidation();

/* валидировать форму добавления карточки */
const addCardFormValidation = new FormValidator(
  validationConfig,
  popupAddCardForm
);
addCardFormValidation.enableValidation();

/* открыть попап редактирования профиля и заполнить инпуты значениями со страницы */
function openPopupEditProfile() {
  editProfileFormValidation.resetForm();
  const userData = userInformation.getUserInfo();
  popupInputFieldName.value = userData.userName;
  popupInputFieldAbout.value = userData.userDescription;
  popupEditProfile.open();
}

/* открыть попап редактирования аватара */
function openPopupEditAvatar() {
  editAvatarFormValidation.resetForm();
  popupEditAvatar.open();
}

/* закрыть попап и заполнить данные на странице значениями введенными в форме */
function submitFormEditProfile(data) {
  popupEditProfile.changeButtonName("Сохранение...");
  api
    .setUserInfo(data)
    .then(() => {
      userInformation.setUserInfo(data);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.changeButtonName("Сохранить");
    });
}

addCardButton.addEventListener("click", openPopupAddCard);
profileInfoEditButton.addEventListener("click", openPopupEditProfile);
profileAvatarContainer.addEventListener("click", openPopupEditAvatar);
