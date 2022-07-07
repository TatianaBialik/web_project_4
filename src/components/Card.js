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
    this._likeCounter.textContent = likesAmount;

    if(this.isLiked()) {
      this._likeButton.classList.add('card__like_active');
    } else {
      this._likeButton.classList.remove('card__like_active');
    }
  }

 deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._cardDeleteButton.addEventListener('click', () => this._handleDeleteCardButton());
    this._likeButton.addEventListener('click', this._handleLikeButton);
    this._cardImage.addEventListener('click', this._handleCardClick);
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    
    this._cardImage = this._cardElement.querySelector('.card__picture');
    const cardDescription = this._cardElement.querySelector('.card__description');

    this._cardDeleteButton = this._cardElement.querySelector('.card__delete-button');
    this._likeButton = this._cardElement.querySelector('.card__like');
    this._likeCounter = this._cardElement.querySelector('.card__like-counter');

    this.setLikes(this._likes);

    if(!(this._userId === this._ownerId)) {
      this._cardDeleteButton.classList.add('card__delete-button_disabled');
    }

    this._cardImage.src = this._image;
    this._cardImage.alt = this._alt;
    cardDescription.textContent = this._title;
    this._setEventListeners();
    
    return this._cardElement;
  }
}

export { Card };