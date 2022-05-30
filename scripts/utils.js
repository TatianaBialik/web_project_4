import { FormValidator } from './FormValidator.js';
import { configObject, cardContainer } from './constants.js';
import { Card } from './Card.js';

/* Modal windows functionality:
- open/close modal window;
- event listeners for close button, closing by pressing Esc and clock outside the window*/

function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const popupElement = document.querySelector('.popup_opened');
    closePopup(popupElement);
  }
}

function closePopupByMouseEvent(popupElement) {
  popupElement.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popupElement);
    }
  })
}

(function setClosePopupEventListeners () {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach(popupElement => closePopupByMouseEvent(popupElement));
})();

function openPopup(popup) {
  document.addEventListener('keydown', closePopupByEscape);
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
}

/* Edit profile: 
- open modal button handle;
- fill the form;
- submit edit form handle
*/

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopupBox = document.querySelector('.popup_type_edit');

const editProfileForm = profileEditPopupBox.querySelector('.form_type_edit');
const popupInputName = editProfileForm.querySelector('.form__input_type_name');
const popupInputInfo = editProfileForm.querySelector('.form__input_type_info');

const profileUserName = document.querySelector('.profile__name');
const profileUserAbout = document.querySelector('.profile__about');

const editProfileFormValidator = new FormValidator(configObject,editProfileForm);

function fillProfileForm() {
  popupInputName.value = profileUserName.textContent;
  popupInputInfo.value = profileUserAbout.textContent;
}

const openEditProfilePopup = () => {
  editProfileFormValidator.resetFormValidation();
  fillProfileForm();
  openPopup(profileEditPopupBox);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileUserName.textContent = popupInputName.value;
  profileUserAbout.textContent = popupInputInfo.value;
  closePopup(profileEditPopupBox);
}

/* Add card:
- open add card modal window;
- add card form submit handle;
- reset form */

function resetPopupForm (popup) {
  const popupFormElement = popup.querySelector('.form');
  popupFormElement.reset();
}
const cardAdditionButton = document.querySelector('.profile__add-button');
const addCardPopupBox = document.querySelector('.popup_type_add-card');

const addCardForm = document.querySelector('.form_type_add-card');
const addCardPopupInputTitle = document.querySelector('.form__input_type_title');
const addCardPopupInputLink = document.querySelector('.form__input_type_link');

const addFormValidator = new FormValidator(configObject, addCardForm);

const openAddCardPopup = () => {
  addFormValidator.resetFormValidation(addCardForm, configObject);
  resetPopupForm(addCardPopupBox);
  openPopup(addCardPopupBox);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = addCardPopupInputTitle.value;
  newCard.link = addCardPopupInputLink.value;
  newCard.alt = 'Here was a beautiful picture';
  const cardElement = new Card(newCard, '#card');
  const cardInstance = cardElement.generateCard();
  closePopup(addCardPopupBox);
  cardContainer.prepend(cardInstance);
}

/* All event listeners for opening and submission modal windows in one function */

function setModalsEventListeners() {
  profileEditButton.addEventListener('click', openEditProfilePopup);
  editProfileForm.addEventListener('submit', handleProfileFormSubmit);
  addCardForm.addEventListener('submit', handleAddCardFormSubmit);
  cardAdditionButton.addEventListener('click', openAddCardPopup);
}

function setFormsValidator() {
  editProfileFormValidator.enableValidation();
  addFormValidator.enableValidation();
}

export { openPopup, closePopup, setModalsEventListeners, setFormsValidator };