export class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector) {
    this._nameField = document.querySelector(nameSelector);
    this._jobField = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return { name: this._nameField.textContent, about: this._jobField.textContent };
  }

  setUserInfo(user) {
    this._nameField.textContent = user.name;
    this._jobField.textContent = user.about;
    this._avatar.src = user.avatar;
    this._id = user._id;
  }

  setAvatar(avatarLink) {
    this._avatar.src = avatarLink;
  }

  getAvatar() {
    return this._avatar;
  }

  getId() {
    return this._id;
  }
}