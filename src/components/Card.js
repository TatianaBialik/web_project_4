/* Class Card:
- creating a card element;
- card generation;
- event listeners: like button, delete button, open modal window */

class Card {
  constructor(cardData, userId, ownerId, templateSelector, handleCardClick, handleLikeButton, handleDeleteCardButton) {
    this._image = cardData.link;
    this._title = cardData.name;
    this._alt = cardData.alt;
    this._likes = cardData.likes;
    this._id = cardData._id;
    this._userId = userId;
    this._ownerId = ownerId;
    this._cardSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeButton = handleLikeButton;
    this._handleDeleteCardButton = handleDeleteCardButton;
  }

  getId() {
    return this._id;
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
  }

  isLiked() {
    return this._likes.find(user => user._id === this._userId);
  }

  setLikes(likes) {
    this._likes = likes;
    const likesAmount = this._likes.length;
    this._cardElement.querySelector('.card__like-counter').textContent = likesAmount;

    if(this.isLiked()) {
      this._cardElement.querySelector('.card__like').classList.add('card__like_active');
    } else {
      this._cardElement.querySelector('.card__like').classList.remove('card__like_active');
    }
  }

 deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    const deleteCardButton = this._cardElement.querySelector('.card__delete-button');
    deleteCardButton.addEventListener('click', () => this._handleDeleteCardButton());

    const likeButton = this._cardElement.querySelector('.card__like');
    likeButton.addEventListener('click', this._handleLikeButton);

    this._cardElement.querySelector('.card__picture').addEventListener('click', this._handleCardClick);
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    
    const cardImage = this._cardElement.querySelector('.card__picture');
    const cardDescription = this._cardElement.querySelector('.card__description');

    this.setLikes(this._likes);

    const cardDeleteButton = this._cardElement.querySelector('.card__delete-button');
    if(!(this._userId === this._ownerId)) {
      cardDeleteButton.classList.add('card__delete-button_disabled');
    }

    cardImage.src = this._image;
    cardImage.alt = this._alt;
    cardDescription.textContent = this._title;
    this._setEventListeners();
    
    return this._cardElement;
  }
}

export { Card };