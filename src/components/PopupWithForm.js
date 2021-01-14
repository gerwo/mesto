import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  
  constructor({popupSelector, handleFormSubmit}){
    super(popupSelector);
    
    this._form = this._popup.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
    this._inputsList = this._form.querySelectorAll('input');
  }
  
  _getInputValues(){
    const formValues = {};

    this._inputsList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }
  
  setEventListeners(){

    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());
      
      this.close();
    });
  }

  close = () =>{
    
    super.close();

    this._form.reset();
  }
}