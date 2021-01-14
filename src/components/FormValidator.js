export default class FormValidator{

    constructor({form, config}){
      this._form = form;
      this._config = config;
      this._inputList = this._form.querySelectorAll(this._config.inputSelector);
    }

    _showError(input) {
      const errorNode = this._form.querySelector(`#${input.id}-error`);
      errorNode.textContent = input.validationMessage;
      errorNode.classList.add(this._config.errorClass);
      input.classList.add(this._config.inputErrorClass);
    }

    _hideError(input) {
      const errorNode = this._form.querySelector(`#${input.id}-error`);
      errorNode.textContent = '';
      errorNode.classList.remove(this._config.errorClass);
      input.classList.remove(this._config.inputErrorClass);
    }

    _setInputEvents() {

      this._inputList.forEach((input) => {
        input.addEventListener('input', () => {
          this._checkInputValidity(input);
          this._setButtonState(this._form.checkValidity());
        });
      });
    }

    _checkInputValidity(input) {
      if(!input.validity.valid){
        this._showError(input);
      }
      else{
        this._hideError(input);
      }
    }

    _setButtonState(isActive) {
      if(isActive){
        this._button.classList.remove(this._config.inactiveButtonClass);
        this._button.disable = false;
      }
      else{
        this._button.classList.add(this._config.inactiveButtonClass);
        this._button.disable = true;
      }
    }

    _deleteFormErrors() {
      this._inputList.forEach((input) => {
          this._hideError(input);
      });
    }

    resetValidation(){
      this._deleteFormErrors();
      this._setButtonState(this._form.checkValidity());
    }
    
    enableValidation(){
      this._button = this._form.querySelector(this._config.submitButtonSelector);
      this._setInputEvents();
    }
}