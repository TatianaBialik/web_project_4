const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

const cardContainer = document.querySelector('.gallery__list');
const cardTemplate = document.querySelector('#card').content;
// let cardElement = cardTemplate.querySelector('.card').cloneNode(true);

// const cardsList = initialCards.map(card => {
//   cardElement.querySelector('.card__picture').src = card.link;
//   cardElement.querySelector('.card__description').textContent = card.name;
//   console.log(cardElement);
//   return cardElement;
// });
// console.log(cardsList);
// cardContainer.append(...cardsList);

initialCards.forEach(card => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__picture').src = card.link;
  cardElement.querySelector('.card__description').textContent = card.name;
  cardContainer.prepend(cardElement);
});



const editButton = document.querySelector('.profile__edit-button');
const popupBox = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');

const form = document.querySelector('.form');
const popupInputName = form.querySelector('.form__input_type_name');
const popupInputInfo = form.querySelector('.form__input_type_info');

const userName = document.querySelector('.profile__name');
const userAbout = document.querySelector('.profile__about');

// edit user info form actions
editButton.addEventListener('click', function () {
  popupBox.classList.add('popup_opened');
  popupInputName.value = userName.textContent;
  popupInputInfo.value = userAbout.textContent;
});

closeButton.addEventListener('click', function () {
  popupBox.classList.remove('popup_opened');
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  popupBox.classList.remove('popup_opened');
  if (popupInputName.value !== '') 
    userName.textContent = popupInputName.value;
  if (popupInputInfo.value !== '')
    userAbout.textContent = popupInputInfo.value;
}

form.addEventListener('submit', handleProfileFormSubmit);

// //like button action
// const likeButtons = document.querySelectorAll('.card__like');

// for (let likeButton of likeButtons) {
//   likeButton.addEventListener('click', function () {
//     likeButton.classList.toggle('card__like_active');
//   })
// }


