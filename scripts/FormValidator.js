/* Class for forms validation */

export class FormValidator {
  constructor(configObject, formElement) {
    this._config = configObject;
    this._formElement = formElement;
  }

  _showInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${this._config.inputErrorClass}`);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(`${this._config.errorClass}`);
  }
  
  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${this._config.inputErrorClass}`);
    errorElement.textContent = '';
    errorElement.classList.remove(`${this._config.errorClass}`);
  }
  
  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }
  
  _hasInvalidInput (inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    })
  }
  
  _setButtonToDisabledState (buttonElement) {
    buttonElement.classList.add(`${this._config.inactiveButtonClass}`);
    buttonElement.disabled = true;
  }
  
  _setButtonToEnabledState (buttonElement) {
    buttonElement.classList.remove(`${this._config.inactiveButtonClass}`);
    buttonElement.disabled = false;
  }
  
  _changeButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._setButtonToDisabledState(buttonElement);
    } else {
      this._setButtonToEnabledState(buttonElement);
    }
  }
  
  _setEventListeners () {
    const inputList = Array.from(this._formElement.querySelectorAll(`${this._config.inputSelector}`));
    const buttonElement = this._formElement.querySelector(`${this._config.submitButtonSelector}`);
    this._changeButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._changeButtonState(inputList, buttonElement);
      })
    })
  }
  
  enableValidation () {
    this._formElement.addEventListener('submit', (evt) => evt.preventDefault);
    this._setEventListeners();
  }
  
  resetFormValidation () {
    const inputList = Array.from(this._formElement.querySelectorAll(`${this._config.inputSelector}`));
    inputList.forEach((inputElement) => {
      this._hideInputError (inputElement);
    })
  }
}