import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction, formValidator) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._formValidator = formValidator;
  }

  getInputValues() {
    const inputList = Array.from(this._popupElement.querySelectorAll('.form__input'));
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
    this._popupElement.querySelector('.form').reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction();
      // this.close();
    });
  }
}