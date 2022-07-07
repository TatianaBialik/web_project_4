import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPicture = document.querySelector('.popup-picture-box__image');
    this._popupCaption = document.querySelector('.popup-picture-box__caption');
  }

  open(image, description) {
    super.open();
    this._popupPicture.src = image;
    this._popupPicture.alt = `Here was a beautiful picture of ${description}`;
    this._popupCaption.textContent = description;
  }
}