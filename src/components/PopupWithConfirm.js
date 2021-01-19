import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  
  constructor({popupSelector, handleConfirmSubmit}){
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._buttonSubmit = this._form.querySelector('.button_type_submit');
    this._handleConfirmSubmit = handleConfirmSubmit;
  }
  
  open(card){
    this._card = card;
    super.open();
  }

  setEventListeners(){

    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleConfirmSubmit(this._card, this._buttonSubmit);
    });
  }

  close(){
    super.close();
  }
}