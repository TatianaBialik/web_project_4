/* Class for forms validation */

export class FormValidator {
  constructor(configObject, formElement) {
    this._config = configObject;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
  }

  _showInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }
  
  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);
  }
  
  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }
  
  _hasInvalidInput () {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    })
  }
  
  _setButtonToDisabledState () {
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }
  
  _setButtonToEnabledState () {
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }
  
  _changeButtonState (inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._setButtonToDisabledState(this._buttonElement);
    } else {
      this._setButtonToEnabledState(this._buttonElement);
    }
  }
  
  _setEventListeners () {
    this._changeButtonState(this._inputList, this._buttonElement);
  
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._changeButtonState(this._inputList, this._buttonElement);
      })
    })
  }
  
  enableValidation () {
    this._formElement.addEventListener('submit', (evt) => evt.preventDefault);
    this._setEventListeners();
  }
  
  resetFormValidation () {
    this._inputList.forEach((inputElement) => {
      this._hideInputError (inputElement);
    })
    this._setButtonToDisabledState();
  }
}