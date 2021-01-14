export default class Popup{

  constructor(popupSeletor){
    this._popup = document.querySelector(popupSeletor);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened');
  }

  close(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }


  _handleEscClose(evt) {
    if(evt.key === "Escape"){
        this.close();
    };
  }
  
  setEventListeners() {

    this._popup.querySelector('.button_type_close')
    .addEventListener('click', () => {
      this.close();
    });

    this._popup.addEventListener('click', evt => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}