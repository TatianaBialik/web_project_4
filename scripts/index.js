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

function addCard(card) {
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
    picturePopup.querySelector('.popup_type_picture__image').src = card.link;
    picturePopup.querySelector('.popup_type_picture__caption').textContent = card.name;
    openPopup(picturePopup);
  }

  cardLike.addEventListener('click', handleLikeActivation);
  cardDeleteButton.addEventListener('click', handleDeleteCardButton);
  cardPicture.addEventListener('click', openPicturePopup);

  cardContainer.prepend(cardElement);
};

//cards init
initialCards.forEach(card => {
  addCard(card);
});

//open/close popup functions
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//popup close buttons action
const closeButtons = document.querySelectorAll('.popup__close-button');

for (let button of closeButtons) {
  const parentBox = button.parentElement;
  button.addEventListener('click', () => {
    closePopup(parentBox.parentElement);
  });
}

// edit user info form actions
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditBox = document.querySelector('.popup_type_edit');

const editForm = popupEditBox.querySelector('.form_type_edit');
const popupInputName = editForm.querySelector('.form__input_type_name');
const popupInputInfo = editForm.querySelector('.form__input_type_info');

const userName = document.querySelector('.profile__name');
const userAbout = document.querySelector('.profile__about');

const openEditProfilePopup = () => {
  openPopup(popupEditBox);
  popupInputName.value = userName.textContent;
  popupInputInfo.value = userAbout.textContent;
}

profileEditButton.addEventListener('click', openEditProfilePopup);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  closePopup(popupEditBox);
  if (popupInputName.value !== '') 
    userName.textContent = popupInputName.value;
  if (popupInputInfo.value !== '')
    userAbout.textContent = popupInputInfo.value;
}

editForm.addEventListener('submit', handleProfileFormSubmit);

//add card form actions
const cardAdditionButton = document.querySelector('.profile__add-button');
const popupAddBox = document.querySelector('.popup_type_add-card');

const addCardForm = document.querySelector('.form_type_add-card');
const addCardPopupInputTitle = document.querySelector('.form__input_type_title');
const addCardPopupInputLink = document.querySelector('.form__input_type_link');

cardAdditionButton.addEventListener('click', function() {
  openPopup(popupAddBox);
});

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  closePopup(popupAddBox);
  const addedCard = {};
  if (addCardPopupInputTitle.value !== '' && addCardPopupInputLink.value !== '') {
    addedCard.name = addCardPopupInputTitle.value;
    addedCard.link = addCardPopupInputLink.value;
    addCardPopupInputTitle.value = '';
    addCardPopupInputLink.value = '';
    addCard(addedCard);
  }
}

addCardForm.addEventListener('submit', handleAddCardFormSubmit);


