function showInputError (formElement, inputElement, { inputErrorClass, errorClass }) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${inputErrorClass}`);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(`${errorClass}`);
}

function hideInputError (formElement, inputElement, { inputErrorClass, errorClass }) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${inputErrorClass}`);
  errorElement.textContent = '';
  errorElement.classList.remove(`${errorClass}`);
}

function checkInputValidity (formElement, inputElement, configObject) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, configObject);
  } else {
    hideInputError(formElement, inputElement, configObject);
  }
}

function hasInvalidInput (inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
}

function setButtonToDisabledState (buttonElement, { inactiveButtonClass }) {
  buttonElement.classList.add(`${inactiveButtonClass}`);
  buttonElement.disabled = true;
}

function setButtonToEnabledState (buttonElement, { inactiveButtonClass }) {
  buttonElement.classList.remove(`${inactiveButtonClass}`);
  buttonElement.disabled = false;
}

function changeButtonState (inputList, buttonElement, { inactiveButtonClass }) {
  if (hasInvalidInput(inputList)) {
    setButtonToDisabledState(buttonElement, { inactiveButtonClass });
  } else {
    setButtonToEnabledState(buttonElement, { inactiveButtonClass });
  }
}

function setEventListeners (formElement, configObject) {
  const inputList = Array.from(formElement.querySelectorAll(`${configObject.inputSelector}`));
  const buttonElement = formElement.querySelector(`${configObject.submitButtonSelector}`);
  changeButtonState(inputList, buttonElement, configObject);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, configObject)
      changeButtonState(inputList, buttonElement, configObject);
    })
  })
}

function enableValidation (configObject) {
  const formList = Array.from(document.querySelectorAll(`${configObject.formSelector}`));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => evt.preventDefault);
    setEventListeners(formElement, configObject);
  })
}

function resetFormValidation (formElement, { inputSelector, inputErrorClass, errorClass }) {
  const inputList = Array.from(formElement.querySelectorAll(`${inputSelector}`));
  inputList.forEach((inputElement) => {
    hideInputError (formElement, inputElement, { inputErrorClass, errorClass });
  })
}

export { resetFormValidation, enableValidation, setButtonToDisabledState };