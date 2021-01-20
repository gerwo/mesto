export default class Api{
  
  constructor({url, headers}){
    this._url = url;
    this._headers = headers;
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
      })
      .then(result => this._getResponseData({result}));
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
      .then(result => this._getResponseData({result}));
  }

  getUserInfo(){
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
      })
      .then(result => this._getResponseData({result}));
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
      .then(result => this._getResponseData({result}));
  }

  setUserAvatar({avatar}) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body : JSON.stringify({
        avatar : avatar 
      })
    })
      .then(result => this._getResponseData({result}));
  }
  
  deleteCard({cardId}) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(result => this._getResponseData({result}));
  }

  likeCard({cardId}) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(result => this._getResponseData({result}));
  }

  unlikeCard({cardId}) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(result => this._getResponseData({result}));
  }

  _getResponseData({result}){
    return result.ok ? result.json() : Promise.reject(new Error(`Ошибка ${result.status}`));
  }
}
