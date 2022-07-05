class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
      .catch(err => console.log(err));
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {headers: this._headers})
      .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
      .catch(err => console.log(err));
  }

  addCard({name,link}) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link 
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    .catch(err => console.log(err))
  }

  addLike(id) {
    return fetch(this._baseUrl + '/cards/likes/' + id, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    .catch(err => console.log(err))
  }

  removeLike(id) {
    return fetch(this._baseUrl + '/cards/likes/' + id, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    .catch(err => console.log(err))
  }

  deleteCard(id) {
    return fetch(this._baseUrl + '/cards/' + id, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  editProfilePhoto(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    .catch(err => console.log(err));
  }

  editProfileInfo(name,about) {
    return fetch(this._baseUrl + '/user/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then (res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    .catch(err => console.log(err));
  }
}

export const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/cohort-3-en',
  headers: {
    authorization: "c0d07090-8c80-49c2-aa7a-cd5677a34984",
    "Content-Type": "application/json"
  }
});