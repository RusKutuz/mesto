import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector(".popup__submit-button");
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      this._submitForm();
    });
  }

  changeButtonName(text) {
    this._submitButton.textContent = text;
  }

  changeSubmitHandler(newSubmitHandler) {
    this._submitForm = newSubmitHandler;
  }
}
