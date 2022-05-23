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

export { openPopup, closePopup };