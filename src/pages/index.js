import './index.css';
import { 
        configObject, 
        initialCards, 
        profileEditButton,
        editProfileForm,
        popupInputName,
        popupInputInfo,
        addCardButton,
        addCardForm 
      } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

/* Forms validation */

const editProfileFormValidator = new FormValidator(configObject,editProfileForm);
const addFormValidator = new FormValidator(configObject, addCardForm);

(function setFormsValidator() {
  editProfileFormValidator.enableValidation();
  addFormValidator.enableValidation();
})();

/* Sub functions */

const handleCardClick = (item) => {
  imagePopup.open(item.link, item.name);
} 

const renderCard = (item) => {
  const card = new Card(item, '#card', () => handleCardClick(item));
  const cardElement = card.generateCard();
  return cardElement;
}

/* Page initialization */

const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsSection.addItem(renderCard(item));
  }
}, '.gallery__list');

cardsSection.renderCards();

/* Creating classes instances and setting event listeners */

const userInfo = new UserInfo('.profile__name', '.profile__about');

const imagePopup = new PopupWithImage('.popup_type_picture');
imagePopup.setEventListeners();

const editFormPopup = new PopupWithForm('.popup_type_edit', () => {
  userInfo.setUserInfo(editFormPopup._getInputValues());
}, editProfileFormValidator);
editFormPopup.setEventListeners();

const addCardPopup = new PopupWithForm('.popup_type_add-card', () => {
  const newCardValues = addCardPopup._getInputValues();
  newCardValues.alt = `Here was a beautiful picture of ${newCardValues.name}`;
  cardsSection.addItem(renderCard(newCardValues));
}, addFormValidator);
addCardPopup.setEventListeners();

/* Event listeners for opening modal windows */

const setInputValues = () => {
  const info = userInfo.getUserInfo();
  popupInputName.value = info.name;
  popupInputInfo.value = info.job;
}

(function setModalsEventListeners() {
  profileEditButton.addEventListener('click', () => {
    setInputValues();
    editFormPopup.open()
  });

  addCardButton.addEventListener('click', () => addCardPopup.open());
})();


