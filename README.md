# Project 4: Around The U.S.

## Overview

* GitHub Pages
* Intro
* Technologies
* Figma
* Updates

### GitHub Pages

[Link to the project on GitHub Pages](https://tatianabialik.github.io/web_project_4/)

### Intro

This is the photo gallery. You can change user name and info, put likes on photo.

### Technologies

* Semantic HTML5
* Flat BEM
* Media Queries
* Grid Layout
* Flexbox
* Vanilla JavaScript
* OOP

### Figma

* [Link to the project in Figma](https://www.figma.com/file/SurN1jaeEQIhuZEDMhmWWf/Sprint-4-Around-The-U.S.-desktop-mobile?node-id=0%3A1)

### Updates

upd 16/04/22 New functions: 
* to add a new card to the gallery;
* to delete cards from the gallery;
* to zoom a card photo by clicking on it.

upd 30/04/22 New functions:
* forms validation;
* close modal window by clicking outside the window and pressing 'Escape' button.

upd 31/05/22 Refactor:
* OOP concept implemented: Card and FormValidator classes are created.

Class Card includes all the image cards functionality and using for creating cards, has one public function that return a card element with attached event listeners.

Class FormValidator includes functionality for forms validation and has a public method to enable form validation. Using by creating a FormValidator object for each form that should be validated.

upd 12/06/22 Refactor:
* File structure changed.
* Popup parent class with PopupWithImage and PopupWithForm child classes created, Section and UserInfo classes created

Class Popup includes modal windows basic functionality (open/close modal window), PopupWithForm and PopupWithImage extend its functionality accordingly modal window type.

Class Section includes functionality for cards gallery rendering.

Class UserInfo created for interaction with values of user profile info.

* Project built with Webpack.

upd 05/07/22 API interaction added:
* All the initial information loads from server.
* All changings save to the server: loaded images, profile info editing, likes on cards, cards deleting.
* Function to change a profile picture added
