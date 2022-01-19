const profileInfoEditButton = document.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__container');
const popupCloseButton = popup.querySelector('.popup__close-icon');
const popupOverlay = popup.querySelector('.popup__overlay');
const popupInputFieldName = popup.querySelector('.popup__input-name');
const popupInputFieldProfession = popup.querySelector('.popup__input-profession');

const profileHeader = document.querySelector('.profile__header');
const profileProfession = document.querySelector('.profile__subscription');




profileInfoEditButton.addEventListener('click', function() {
    popup.classList.add('popup_opened');
    popupInputFieldName.placeholder = profileHeader.textContent;
    popupInputFieldProfession.placeholder = profileProfession.textContent;
});

popupCloseButton.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
});

popupOverlay.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        popup.classList.remove('popup_opened');
    }
});

popupForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileHeader.textContent = popupInputFieldName.value;
    profileProfession.textContent = popupInputFieldProfession.value;
    popup.classList.remove('popup_opened');
});