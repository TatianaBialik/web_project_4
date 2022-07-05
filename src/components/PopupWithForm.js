import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit, formValidator) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._formValidator = formValidator;
    this._formElement = this._popupElement.querySelector('.form');
  }

<<<<<<< HEAD
  _getInputValues() {
    const inputList = [...this._popupElement.querySelectorAll('.form__input')];
=======
  getInputValues() {
    const inputList = Array.from(this._popupElement.querySelectorAll('.form__input'));
>>>>>>> develop
    const valuesObject = {};
    inputList.forEach(input => {
      valuesObject[input.name] = input.value;
    });
    return valuesObject;
  }

  open() {
    super.open();
    this._formValidator.resetFormValidation();
  }

  close() {
    super.close();
    this._formElement.reset();
  }

<<<<<<< HEAD
  _onSubmit = (evt) => {
    evt.preventDefault();
    const inputValues = this._getInputValues();
    this._handleSubmit(inputValues);
    this.close();
  }

  _setEventListeners() {
    super._setEventListeners();
    this._formElement.addEventListener('submit', this._onSubmit);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._formElement.removeEventListener('submit', this._onSubmit);
=======
  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction();
      // this.close();
    });
>>>>>>> develop
  }
}