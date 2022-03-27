const editButton = document.querySelector('.profile__edit-button');
const popupBox = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');

const form = document.querySelector('.form');
const popupInputName = form.querySelector('.form__input_type_name');
const popupInputInfo = form.querySelector('.form__input_type_info');

const userName = document.querySelector('.profile__name');
const userAbout = document.querySelector('.profile__about');

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

//like button action
const likeButtons = document.querySelectorAll('.card__like');

for (let likeButton of likeButtons) {
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('card__like_active');
  })
}


