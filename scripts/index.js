import { initialCards, cardContainer } from './constants.js';
import { Card } from './Card.js';
import {  setModalsEventListeners, setFormsValidator } from './utils.js';

(function cardsInitialization() {
  initialCards.forEach(card => {
    const cardInstance = new Card(card, '#card');
    const cardElement = cardInstance.generateCard();
    cardContainer.prepend(cardElement);
  });
})();

setModalsEventListeners();
setFormsValidator();
