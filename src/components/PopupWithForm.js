import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit, formValidator) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._formValidator = formValidator;
    this._formElement = this._popupElement.querySelector('.form');
    this._inputList = Array.from(this._popupElement.querySelectorAll('.form__input'));
    this._submitButton = this._formElement.querySelector('.form__submit-button');
    this._submitButtonText = this._submitButton.textContent;
  }

  getInputValues() {
    const valuesObject = {};
    this._inputList.forEach(input => {
      valuesObject[input.name] = input.value;
    });
    return valuesObject;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  open() {
    super.open();
    this._formValidator.resetFormValidation();
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }

  renderLoading(isLoading, loadingText = 'Saving...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}