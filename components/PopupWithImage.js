import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popupImage = this._popup.querySelector(".popup__image");
    this.popupDescription = this._popup.querySelector(".popup__description");
  }

  open(image, description) {
    this.popupImage.src = image;
    this.popupImage.alt = description;
    this.popupDescription.textContent = description;
    super.open();
  }
}
