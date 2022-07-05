export class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._nameField = document.querySelector(nameSelector);
    this._jobField = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return { name: this._nameField.textContent, job: this._jobField.textContent };
  }

  setUserInfo(user) {
    this._nameField.textContent = user.name;
    this._jobField.textContent = user.about;
  }
}