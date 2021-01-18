export default class Api{
  
  constructor({url, token}){
    this._url = url;
    this._token = token;
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers : {
        authorization: this._token
      }
    })
      .then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result}`));
  }

  addCard({name, link}){
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers : {
        authorization: this._token,
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        name: name,
        link : link 
      })
    })
      .then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result}`));
  }

  getUserInfo(){
    return fetch(`${this._url}/users/me`, {
      headers : {
        authorization: this._token
      }
    })
      .then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result}`));
  }

  setUserInfo({name, about}){
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers : {
        authorization: this._token,
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        name: name,
        about : about 
      })
    })
      .then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result}`));
  }

  setUserAvatar({avatar}) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers : {
        authorization: this._token,
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        avatar : avatar 
      })
    })
      .then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result}`));
  }
  
  deleteCard({cardId}) {

  }

  likeCard({cardId}) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers : {
        authorization: this._token
      }
    })
      .then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result}`));
  }

  unlikeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers : {
        authorization: this._token
      }
    })
      .then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result}`));
  }
}
