export default class Api{
  
  constructor({url, headers}){
    this._url = url;
    this._headers = headers;
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
      })
      .then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result.status}`));
  }

  addCard({name, link}){
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body : JSON.stringify({
        name: name,
        link : link 
      })
    })
      .then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result.status}`));
  }

  getUserInfo(){
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
      })
      .then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result.status}`));
  }

  setUserInfo({name, about}){
    return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body : JSON.stringify({
          name: name,
          about : about 
        })
      })
      .then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result.status}`));
  }

  setUserAvatar({avatar}) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body : JSON.stringify({
        avatar : avatar 
      })
    })
      .then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result.status}`));
  }
  
  deleteCard({cardId}) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result.status}`));
  }

  likeCard({cardId}) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result.status}`));
  }

  unlikeCard({cardId}) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result.status}`));
  }
}
