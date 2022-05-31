import { configObject, initialCards, cardContainer } from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup } from './utils.js';

function renderCard (card, cardContainer) {
  cardContainer.prepend(card);
}

(function cardsInitialization() {
  initialCards.forEach(card => {
    const cardInstance = new Card(card, '#card');
    const cardElement = cardInstance.generateCard();
    renderCard(cardElement, cardContainer);
  });
})();

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
  newCard.alt = `Here was a beautiful picture of ${newCard.name}`;
  const cardElement = new Card(newCard, '#card');
  const cardInstance = cardElement.generateCard();
  closePopup(addCardPopupBox);
  renderCard(cardInstance, cardContainer);
}

/* All event listeners for opening and submission modal windows in one function */

(function setModalsEventListeners() {
  profileEditButton.addEventListener('click', openEditProfilePopup);
  editProfileForm.addEventListener('submit', handleProfileFormSubmit);
  addCardForm.addEventListener('submit', handleAddCardFormSubmit);
  cardAdditionButton.addEventListener('click', openAddCardPopup);
})();

(function setFormsValidator() {
  editProfileFormValidator.enableValidation();
  addFormValidator.enableValidation();
})();
