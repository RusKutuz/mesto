export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }
    
    /* открыть попап */
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', (event) => this._handleEscClose(event));
        this._popup.addEventListener('click', (event) => this._closePopupBorderOutside(event));
    }
    
    /* закрыть попап */
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('click', this._closePopupBorderOutside);
    }
    
    /* закрыть попап по клику на кнопку Esc*/
    _handleEscClose(event) {
        if (event.key == "Escape") {
            this.close();
        }
    }
        
    /* закрыть попап по клику за границами попапа*/
    _closePopupBorderOutside(event) {
        if (event.target === event.currentTarget) {
            this.close();
        }
    }

    /* навесить слушатели событий */
    setEventListeners() {
        const popupCloseButton = this._popup.querySelector('.popup__close-icon');
        popupCloseButton.addEventListener('click', () => this.close());
    }
}











