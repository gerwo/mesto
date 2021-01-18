export default class Api{
  
  constructor({url, token, group}){
    this._url = url;
    this._token = token;
    this._group = group;
  }

  getCards() {
    return fetch(`${this._url}/${this._group}/cards`, {
      headers : {
        authorization: this._token
      }
    })
      .then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result}`));
  }

  addCard({name, link}){
    return fetch(`${this._url}/${this._group}/cards`, {
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
    return fetch(`${this._url}/${this._group}/users/me`, {
      headers : {
        authorization: this._token
      }
    })
      .then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result}`));
  }

  setUserInfo({name, about}){
    return fetch(`${this._url}/${this._group}/users/me`, {
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
}
