import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit, formValidator) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._formValidator = formValidator;
    this._formElement = this._popupElement.querySelector('.form');
  }

  _getInputValues() {
    const inputList = [...this._popupElement.querySelectorAll('.form__input')];
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

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleSubmit(inputValues);
      this.close();
    });
  }
}