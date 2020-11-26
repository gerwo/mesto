const showError = (form, input, config) => {
    const errorNode = form.querySelector(`#${input.id}-error`);
    errorNode.textContent = input.validationMessage;
    errorNode.classList.add(config.errorClass);
    input.classList.add(config.inputErrorClass);
}

const hideError = (form, input, config) => {
    const errorNode = form.querySelector(`#${input.id}-error`);
    errorNode.textContent = '';
    errorNode.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass);
}

const clearForm = (form) => {
    form.reset();
}

const deleteFormErrors= (popup) => {
    const button = popup.querySelector(config.submitButtonSelector);
    const form  = popup.querySelector(config.formSelector);

    clearForm(form);

    form.querySelectorAll(config.inputSelector).forEach((input) => {
        hideError(form, input, config);
    });
    
}

const checkInputValidity = (input, form, config) => {  
    if(!input.validity.valid){
        showError(form, input, config);
    }
    else{
        hideError(form, input, config);
    }
}

const setButtonState = (button, isActive, config) => {    
    if(isActive){
        button.classList.remove(config.inactiveButtonClass);
        button.disable = false;
    }
    else{
        button.classList.add(config.inactiveButtonClass);
        button.disable = true;
    }
}

const setInputEvents = (form, config) => {
    const inputList = form.querySelectorAll(config.inputSelector);
    const button = form.querySelector(config.submitButtonSelector);

    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(input, form, config);
            setButtonState(button, form.checkValidity(), config);
        });
    });
}


