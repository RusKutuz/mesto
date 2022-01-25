const profileInfoEditButton = document.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__container');
const popupCloseButton = popup.querySelector('.popup__close-icon');
const popupInputFieldName = popup.querySelector('.popup__input_name');
const popupInputFieldProfession = popup.querySelector('.popup__input_profession');

const profileHeader = document.querySelector('.profile__header');
const profileProfession = document.querySelector('.profile__subscription');

const body = document.querySelector('.body');

/* отключить скролл страницы */
function stopScroll() {
    body.classList.add('body_scroll-off');
}

/* включить скролл страницы */
function startScroll() {
    body.classList.remove('body_scroll-off');
}

/* открыть попап и заполнить инпуты значениями со страницы */
function openPopup() {
    popup.classList.add('popup_opened');
    popupInputFieldName.value = profileHeader.textContent;
    popupInputFieldProfession.value = profileProfession.textContent;
    stopScroll();
}

profileInfoEditButton.addEventListener('click', openPopup);

/* закрыть попап */
function closePopup() {
    popup.classList.remove('popup_opened');
    startScroll();
}

popupCloseButton.addEventListener('click', closePopup);

/* закрыть попап и заполнить данные на странице значениями введенными в форме */
function submitForm(evt) {
    evt.preventDefault();
    profileHeader.textContent = popupInputFieldName.value;
    profileProfession.textContent = popupInputFieldProfession.value;
    closePopup();
}

popupForm.addEventListener('submit', submitForm);

/* 
Сейчас закрытие вне окошка работает не совсем корректно - если щелкнуть в пределах окна, а отпустить мышку за пределами, 
то окно закроется, хотя не должно. Из-за этого могут возникнуть проблемы с выделением контента внутри инпутов - если 
при выделении вывести курсор за пределы окна попапа, то окошко свернется.

const popupOverlay = popup.querySelector('.popup__overlay');
popupOverlay.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        popup.classList.remove('popup_opened');
    }
});
*/