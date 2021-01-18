export default class UserInfo{
  
  constructor({avatarSelector, nameSelector, aboutSelector}){
    this._avatar = document.querySelector(avatarSelector);
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
  }

  getUserInfo(){
    return {
      avatar : this._avatar,
      name : this._name.textContent,
      about : this._about.textContent
    }
  }

  setUserInfo({avatar, name, about}){
    this._avatar.src = avatar;
    this._name.textContent = name;
    this._about.textContent = about;
  }
}