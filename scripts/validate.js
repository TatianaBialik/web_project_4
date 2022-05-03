const configObject = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible"
}

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

function setEventListeners (formElement, { inputSelector, submitButtonSelector }) {
  const inputList = Array.from(formElement.querySelectorAll(`${inputSelector}`));
  const buttonElement = formElement.querySelector(`${submitButtonSelector}`);
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

function resetFormValidation (formElement, { inputSelector }) {
  const inputList = Array.from(formElement.querySelectorAll(`${inputSelector}`));
  inputList.forEach((inputElement) => {
    hideInputError (formElement, inputElement, configObject);
  })
}

export { resetFormValidation, enableValidation, setButtonToDisabledState };