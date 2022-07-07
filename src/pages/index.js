import './index.css';
import { 
        configObject, 
        profileEditButton,
        editProfileForm,
        popupInputName,
        popupInputInfo,
        addCardButton,
        addCardForm,
        avatar,
        changeAvatarForm
      } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { api } from '../components/Api.js';

/* Forms validation */

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  })
};

enableValidation(configObject);

/* Card handlers and rendering */

const handleCardClick = (item) => {
  imagePopup.open(item.link, item.name);
} 

const handleLikeButton = (card) => {
  if (card.isLiked()) {
    api.removeLike(card.getId())
      .then(res => {
        card.setLikes(res.likes);
      })
      .catch(err => console.log(err))
  } else {
    api.addLike(card.getId())
      .then(res => {
        card.setLikes(res.likes);
      })
      .catch(err => console.log(err))
  }
}

let cardToDelete;
const handleDeleteCardButton = (card) => {
  deleteCardSubmissionPopup.open();
  cardToDelete = card;
}

const renderCard = (item) => {
  const card = new Card(
    item, 
    userInfo.getId(),
    item.owner._id,
    '#card', 
    () => handleCardClick(item), 
    () => handleLikeButton(card),
    () => handleDeleteCardButton(card)
  );
  const cardElement = card.generateCard();
  return cardElement;
}

/* Page initialization */

const cardsSection = new Section({
  renderer: (item) => {
    cardsSection.addItem(renderCard(item));
  }
}, '.gallery__list');

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);

    cardsSection.renderCards(cards);
  })
  .catch(err => console.log(err))

/* Creating classes instances and setting event listeners */

const userInfo = new UserInfo('.profile__name', '.profile__about', '.profile__avatar');

const imagePopup = new PopupWithImage('.popup_type_picture');

const handleEditSubmission = (popup) => {
  popup.renderLoading(true);

  api.editProfileInfo(popup.getInputValues())
    .then(res => {
      userInfo.setUserInfo(res);
      popup.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      popup.renderLoading(false);
    })
}

const editFormPopup = new PopupWithForm(
  '.popup_type_edit', 
  () => handleEditSubmission(editFormPopup), 
  formValidators['edit-info-form']);
editFormPopup.setEventListeners();

const handleAddCardSubmission = (popup) => {
  const newCardValues = popup.getInputValues();
  newCardValues.alt = `Here was a beautiful picture of ${newCardValues.name}`;

  popup.renderLoading(true);

  api.addCard(newCardValues)
    .then(res => {
      cardsSection.addNewItem(renderCard(res))
      popup.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      popup.renderLoading(false);
    })
}

const addCardPopup = new PopupWithForm(
  '.popup_type_add-card', 
  () => handleAddCardSubmission(addCardPopup), 
  formValidators['add-form']);
addCardPopup.setEventListeners();

const handleChangeAvatarSubmission = (popup) => {
  popup.renderLoading(true);

  api.editProfilePhoto(popup.getInputValues().avatar)
    .then(res => {
      userInfo.setAvatar(res.avatar);
      popup.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      popup.renderLoading(false);
    })
}

const changeAvatarPopup = new PopupWithForm(
  '.popup_type_edit-avatar', 
  () => handleChangeAvatarSubmission(changeAvatarPopup), 
  formValidators['edit-avatar-form']);
changeAvatarPopup.setEventListeners();

const handleDeleteCardSubmission = (popup) => {
  api.deleteCard(cardToDelete.getId())
  .then(() => {
    cardToDelete.deleteCard();
    popup.close();
  })
  .catch(err => console.log(err))
}

const deleteCardSubmissionPopup = new PopupWithConfirmation(
  '.popup_type_delete-card', 
  () => handleDeleteCardSubmission(deleteCardSubmissionPopup));
deleteCardSubmissionPopup.setEventListeners();

/* Event listeners for opening modal windows */

(function setModalsEventListeners() {
  profileEditButton.addEventListener('click', () => {
    editFormPopup.setInputValues(userInfo.getUserInfo());
    editFormPopup.open()
  });

  addCardButton.addEventListener('click', () => addCardPopup.open());

  userInfo.getAvatar().addEventListener('click', () => changeAvatarPopup.open());
})();

