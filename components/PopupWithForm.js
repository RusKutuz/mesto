import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._submitForm = submitForm;
    this._submitButton = this._popup.querySelector(".popup__submit-button");
    this._inputs = Array.from(this._form.querySelectorAll(".popup__input"));
    this._getInputValues = this._getInputValues.bind(this);
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  changeSubmitHandler(newSubmitHandler) {
    this._submitForm = newSubmitHandler;
  }

  changeButtonName(text) {
    this._submitButton.textContent = text;
  }

  close() {
    super.close();
    this._form.reset();
  }
}
