/* Form validation object */

const configObject = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible"
}

/* Initial cards array*/

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

/* Edit form constants */

const profileEditButton = document.querySelector('.profile__edit-button');
const editProfileForm = document.querySelector('.form_type_edit');
const popupInputName = editProfileForm.querySelector('.form__input_type_name');
const popupInputInfo = editProfileForm.querySelector('.form__input_type_info');

/* Add card form constants */

const addCardButton = document.querySelector('.profile__add-button');
const addCardForm = document.querySelector('.form_type_add-card');

/* Change profile picture form constants */

const changeAvatarForm = document.querySelector('.form_type_edit-avatar');

/* User profile */

// const avatar = document.querySelector('.profile__avatar');


export { 
        configObject, 
        initialCards, 
        profileEditButton,
        editProfileForm,
        popupInputName,
        popupInputInfo,
        addCardButton,
        addCardForm,
        // avatar,
        changeAvatarForm
       };