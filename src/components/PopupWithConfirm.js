import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  
  constructor({popupSelector, handleConfirmSubmit}){
    super(popupSelector);
    this._handleConfirmSubmit = handleConfirmSubmit;
  }
  
  open(element){

    this._element = element;
    super.open();

  }
}