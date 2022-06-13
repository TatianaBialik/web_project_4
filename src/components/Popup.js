export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    this._setEventListeners();
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    this._removeEventListeners();
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleMouseClick = (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
      this.close();
    }
  }

  _setEventListeners() {
    this._popupElement.addEventListener('mousedown', this._handleMouseClick);
    document.addEventListener('keydown', this._handleEscClose);
  }

  _removeEventListeners() {
    this._popupElement.removeEventListener('mousedown', this._handleMouseClick);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}