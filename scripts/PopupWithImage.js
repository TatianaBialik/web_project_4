import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(image, description) {
    super.open();
    const popupPicture = document.querySelector('.popup-picture-box__image');
    const popupCaption = document.querySelector('.popup-picture-box__caption');
    popupPicture.src = image;
    popupPicture.alt = `Here was a beautiful picture of ${description}`;
    popupCaption.textContent = description;
  }
}