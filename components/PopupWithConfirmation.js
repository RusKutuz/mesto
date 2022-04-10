import {Popup} from './Popup.js';

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitButton = this._popup.querySelector('.popup__submit-button');
        this._submitForm = submitForm;
    }


    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitForm();
        }
            );
    }

    changeButtonNameOnPending(text) {
        this._submitButton.textContent = text;
    }


    close() {
        super.close(); 
    }

}