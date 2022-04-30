const configObject = {
  formSelector: "form",
  inputSelector: "form__input",
  submitButtonSelector: "form__submit-button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible"
}

function showInputError (formElement, inputElement, configObject) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${configObject.inputErrorClass}`);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(`${configObject.errorClass}`);
}

function hideInputError (formElement, inputElement, configObject) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${configObject.inputErrorClass}`);
  errorElement.textContent = '';
  errorElement.classList.remove(`${configObject.errorClass}`);
}

function checkInputValidity (formElement, inputElement) {
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

function changeButtonState (inputList, buttonElement, configObject) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${configObject.inactiveButtonClass}`);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(`${configObject.inactiveButtonClass}`);
    buttonElement.disabled = false;
  }
}

function setEventListeners (formElement, configObject) {
  const inputList = Array.from(formElement.querySelectorAll(`.${configObject.inputSelector}`));
  const buttonElement = formElement.querySelector(`.${configObject.submitButtonSelector}`);
  changeButtonState(inputList, buttonElement, configObject);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, configObject)
      changeButtonState(inputList, buttonElement, configObject);
    })
  })
}

function enableValidation (configObject) {
  const formList = Array.from(document.querySelectorAll(`.${configObject.formSelector}`));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => evt.preventDefault);
    setEventListeners(formElement, configObject);
  })
}

enableValidation(configObject);

function resetFormValidation (formElement) {
  const inputList = Array.from(formElement.querySelectorAll(`.${configObject.inputSelector}`));
  inputList.forEach((inputElement) => {
    hideInputError (formElement, inputElement, configObject);
  })
}

export { resetFormValidation };