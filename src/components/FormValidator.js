export default class FormValidator{

    constructor(form, config, popupSelector){
        this._form = form;
        this._config = config;
        this._popup = document.querySelector(popupSelector);
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

    _clearForm() {
        this._form.reset();
    }

    _setInputEvents() {
        const inputList = this._form.querySelectorAll(this._config.inputSelector);

        inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._setButtonState(this._form.checkValidity());
            });
        });
    }

    _deleteFormErrors() {
        const form  = this._popup.querySelector(this._config.formSelector);

        form.querySelectorAll(this._config.inputSelector).forEach((input) => {
            this._hideError(input);
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
    enableValidation(){
        this._button = this._form.querySelector(this._config.submitButtonSelector);
        this._deleteFormErrors();
        this._setInputEvents();
        this._setButtonState(this._form.checkValidity());
    }
}