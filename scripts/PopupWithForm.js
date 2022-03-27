import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._submitForm = submitForm;
    }

    _getInputValues() {
        const inputs = Array.from(this._form.querySelectorAll('.popup__input'));
        const inputValues = {};
        inputs.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitForm);
    }

    close() {
        super.close(); 
        this.inputValues = this._getInputValues();
        this._form.reset();
    }

}