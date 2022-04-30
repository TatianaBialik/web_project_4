import {resetFormValidation} from './validate.js';

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
    alt: "A river with forest on the banks, mountains in the background"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
    alt: "A lake surrounded by mountains and forest"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
    alt: "Sunrise above dark hills"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
    alt: "Starry night, mountains with piece of snow"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
    alt: "Coast of lake, mountains on the background"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
    alt: "Small dock with little boats on the mountain lake"
  }
];

//add card action
const cardContainer = document.querySelector('.gallery__list');
const cardTemplate = document.querySelector('#card').content;
const picturePopup = document.querySelector('.popup_type_picture');

function createCard(card) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardLike = cardElement.querySelector('.card__like');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardPicture = cardElement.querySelector('.card__picture');
  const cardDescription = cardElement.querySelector('.card__description');

  cardPicture.src = card.link;
  cardPicture.alt = card.alt;
  cardDescription.textContent = card.name;

  const handleLikeActivation = () => {
    cardLike.classList.toggle('card__like_active');
  }

  const handleDeleteCardButton = () => {
    cardElement.remove();
  }

  const openPicturePopup = () => {
    picturePopup.querySelector('.popup-picture-box__image').src = card.link;
    picturePopup.querySelector('.popup-picture-box__image').alt = card.alt;
    picturePopup.querySelector('.popup-picture-box__caption').textContent = card.name;
    openPopup(picturePopup);
  }

  cardLike.addEventListener('click', handleLikeActivation);
  cardDeleteButton.addEventListener('click', handleDeleteCardButton);
  cardPicture.addEventListener('click', openPicturePopup);

  return cardElement;
}

function renderCard(card) {
  cardContainer.prepend(createCard(card));
};

//cards init
initialCards.forEach(card => {
  renderCard(card);
});

/*
open popup steps:
  - set event listeners: 
    close by clicking on overlay and close button, 
    pressing escape button;
  - reset form input fields and validation state;
  - set submit button to disabled state.
 */

function closePopupByMouseEvent(popupElement) {
  popupElement.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popupElement);
    }
  })
}

function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const popupElement = document.querySelector('.popup_opened');
    closePopup(popupElement);
  }
}

function setCloseEventListeners (popupElement) {
  closePopupByMouseEvent(popupElement);
  document.addEventListener('keydown', closePopupByEscape);
}

function resetPopupForm (popup) {
  if (popup.querySelector('.form')) {
    const popupFormElement = popup.querySelector('.form');
    popupFormElement.reset();
    resetFormValidation(popupFormElement);
  };
}

function setDisabledButtonState(popup) {
  if (popup.querySelector('.form')) {
    const popupSubmitButton = popup.querySelector('.form__submit-button');
    popupSubmitButton.classList.add('form__submit-button_disabled');
  }
}

//open/close popup functions
function openPopup(popup) {
  resetPopupForm(popup);
  setDisabledButtonState(popup);
  setCloseEventListeners(popup);
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
}

// edit user info form actions
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopupBox = document.querySelector('.popup_type_edit');

const editProfileForm = profileEditPopupBox.querySelector('.form_type_edit');
const popupInputName = editProfileForm.querySelector('.form__input_type_name');
const popupInputInfo = editProfileForm.querySelector('.form__input_type_info');

const profileUserName = document.querySelector('.profile__name');
const profileUserAbout = document.querySelector('.profile__about');

function fillProfileForm() {
  popupInputName.value = profileUserName.textContent;
  popupInputInfo.value = profileUserAbout.textContent;
}

const openEditProfilePopup = () => {
  openPopup(profileEditPopupBox);
  fillProfileForm();
}

profileEditButton.addEventListener('click', openEditProfilePopup);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileUserName.textContent = popupInputName.value;
  profileUserAbout.textContent = popupInputInfo.value;
  closePopup(profileEditPopupBox);
}

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

//add card form actions
const cardAdditionButton = document.querySelector('.profile__add-button');
const addCardPopupBox = document.querySelector('.popup_type_add-card');

const addCardForm = document.querySelector('.form_type_add-card');
const addCardPopupInputTitle = document.querySelector('.form__input_type_title');
const addCardPopupInputLink = document.querySelector('.form__input_type_link');

cardAdditionButton.addEventListener('click', function() {
  openPopup(addCardPopupBox);
});

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = addCardPopupInputTitle.value;
  newCard.link = addCardPopupInputLink.value;
  newCard.alt = 'Here was a beautiful picture';
  closePopup(addCardPopupBox);
  renderCard(newCard);
}

addCardForm.addEventListener('submit', handleAddCardFormSubmit);







