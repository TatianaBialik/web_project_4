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

const editProfileFormValidator = new FormValidator(configObject,editProfileForm);
const addFormValidator = new FormValidator(configObject, addCardForm);
const changeAvatarFormValidator = new FormValidator(configObject,changeAvatarForm);

(function setFormsValidator() {
  editProfileFormValidator.enableValidation();
  addFormValidator.enableValidation();
  changeAvatarFormValidator.enableValidation();
})();

/* Sub functions */

const handleCardClick = (item) => {
  imagePopup.open(item.link, item.name);
} 

let cardToDelete;

const renderCard = (item) => {
  const card = new Card(
    item, 
    userId,
    item.owner._id,
    '#card', 
    () => handleCardClick(item), 
    () => {
      if (card.isLiked()) {
        api.removeLike(card.getId())
          .then(res => {
            card.setLikes(res.likes);
          }) 
      } else {
        api.addLike(card.getId())
          .then(res => {
            card.setLikes(res.likes);
          })
      }
    },
    () => {
      deleteCardSubmissionPopup.open();
      cardToDelete = card;
    });
  const cardElement = card.generateCard();
  return cardElement;
}

/* Page initialization */

const cardsSection = new Section({
  renderer: (item) => {
    cardsSection.addItem(renderCard(item));
    
  }
}, '.gallery__list');


let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    avatar.src = userData.avatar;

    cardsSection.renderCards(cards);
  })

/* Creating classes instances and setting event listeners */

const userInfo = new UserInfo('.profile__name', '.profile__about');

const imagePopup = new PopupWithImage('.popup_type_picture');

<<<<<<< HEAD
const editFormPopup = new PopupWithForm('.popup_type_edit', (inputValues) => {
  userInfo.setUserInfo(inputValues);
}, editProfileFormValidator);

const addCardPopup = new PopupWithForm('.popup_type_add-card', (inputValues) => {
  inputValues.alt = `Here was a beautiful picture of ${inputValues.name}`;
  cardsSection.addItem(renderCard(inputValues));
=======
function renderLoading(button) {
  const buttonText = button.textContent;
  button.textContent = 'Saving...';
  return buttonText;
}

//////////////////////////////////////////////////////////////////////////////////////
const editFormPopup = new PopupWithForm('.popup_type_edit', () => {
  const formButton = editProfileForm.querySelector('.form__submit-button')
  const formButtonText = renderLoading(formButton);

  api.editProfileInfo(editFormPopup.getInputValues())
    .then(res => {
      userInfo.setUserInfo(res);
    })
    .finally(() => {
      editFormPopup.close();
      formButton.textContent = formButtonText
    })
}, editProfileFormValidator);
editFormPopup.setEventListeners();
/////////////////////////////////////////////////////////////////////////////////////

const addCardPopup = new PopupWithForm('.popup_type_add-card', () => {
  const newCardValues = addCardPopup.getInputValues();

  const formButton = addCardForm.querySelector('.form__submit-button')
  const formButtonText = renderLoading(formButton);

  api.addCard(newCardValues.name, newCardValues.link)
    .then(res => {
      cardsSection.addItem(renderCard(res));
    })
    .finally(() => {
      addCardPopup.close();
      formButton.textContent = formButtonText
    })
  newCardValues.alt = `Here was a beautiful picture of ${newCardValues.name}`;
>>>>>>> develop
}, addFormValidator);

const changeAvatarPopup = new PopupWithForm('.popup_type_edit-avatar', () => {
  const formButton = changeAvatarForm.querySelector('.form__submit-button')
  const formButtonText = renderLoading(formButton);

  api.editProfilePhoto(changeAvatarPopup.getInputValues().avatar)
    .then(res => {
      avatar.src = res.avatar;
    })
    .finally(() => {
      changeAvatarPopup.close();
      formButton.textContent = formButtonText;
    })
}, changeAvatarFormValidator);
changeAvatarPopup.setEventListeners();

const deleteCardSubmissionPopup = new PopupWithConfirmation('.popup_type_delete-card', () => {
  api.deleteCard(cardToDelete.getId())
    .finally(deleteCardSubmissionPopup.close());
  cardToDelete.deleteCard();
});
deleteCardSubmissionPopup.setEventListeners();

/* Event listeners for opening modal windows */

const fillProfileInfoForm = () => {
  const info = userInfo.getUserInfo();
  popupInputName.value = info.name;
  popupInputInfo.value = info.job;
}

(function setModalsEventListeners() {
  profileEditButton.addEventListener('click', () => {
    fillProfileInfoForm();
    editFormPopup.open()
  });

  addCardButton.addEventListener('click', () => addCardPopup.open());

  avatar.addEventListener('click', () => changeAvatarPopup.open());
})();

