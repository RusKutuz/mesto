import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(image, description) {
        const popupImage = this._popup.querySelector('.popup__image');
        const popupDescription = this._popup.querySelector('.popup__description');
        popupImage.src = image;
        popupImage.alt = description;
        popupDescription.textContent = description;
        super.open();
    }
}