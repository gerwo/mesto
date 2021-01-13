export default class UserInfo{
  constructor({nameSelector, jobSelector}){
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
  }

  getUserInfo(){
    return {
      name : this._nameSelectorm,
      job : this._jobSelector
    }
  }

  setUserInfo(name, job){
    this._nameSelectorm.textContent = name;
    this._jobSelector.textContent = job;
  }
}