import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._submitForm = submitForm;
        this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
        this._getInputValues = this._getInputValues.bind(this);
        this.inputValues = {};
    }

    _getInputValues() {
        this._inputs.forEach((input) => {
            this.inputValues[input.name] = input.value;
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._getInputValues();
            this._submitForm(this.inputValues);
        }
            );
    }

    close() {
        super.close(); 
        this._form.reset();
    }

}