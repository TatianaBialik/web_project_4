import { openPopup, closePopup } from './utils.js';

/* Class Card:
- creating a card element;
- card generation;
- event listeners: like button, delete button, open modal window */

const picturePopup = document.querySelector('.popup_type_picture');
const picturePopupImage = picturePopup.querySelector('.popup-picture-box__image');
const picturePopupCaption = picturePopup.querySelector('.popup-picture-box__caption');

class Card {
  constructor(cardData, templateSelector) {
    this._image = cardData.link;
    this._title = cardData.name;
    this._alt = cardData.alt;
    this._cardSelector = templateSelector;
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
  }

  _handleLikeActivation() {
    const likeButton = this._cardElement.querySelector('.card__like');
    
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('card__like_active');
    });
  }

  _handleDeleteCardButton() {
    this._cardElement.remove();
  }

  _handleOpenPopup() {
    picturePopupImage.src = this._image;
    picturePopupImage.alt = this._alt
    picturePopupCaption.textContent = this._title;
    openPopup(picturePopup);
  }

  _setEventListeners() {
    const deleteCardButton = this._cardElement.querySelector('.card__delete-button');
    deleteCardButton.addEventListener('click', () => this._handleDeleteCardButton());
    this._handleLikeActivation();
    this._cardElement.querySelector('.card__picture').addEventListener('click', () => this._handleOpenPopup());
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    
    this._cardElement.querySelector('.card__picture').src = this._image;
    this._cardElement.querySelector('.card__description').textContent = this._title;
    this._setEventListeners();
    
    return this._cardElement;
  }
}

export { Card };