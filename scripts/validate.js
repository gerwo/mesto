const showError = (form, input, config) => {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    error.classList.add(config.errorClass);
    input.classList.add(config.inputErrorClass);
}

const hideError = (form, input, config) => {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = '';
    error.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass);
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

const setEventsForForm = (form, config) => {
    const inputList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);

    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(input, form, config);
            setButtonState(submitButton, form.checkValidity(), config);
        })
    });
}

const enableValidationFunc = (config) => {
    const forms = document.querySelectorAll(config.formSelector);

    forms.forEach((form) => {
        setEventsForForm(form, config);

        const submitButton = form.querySelector(config.submitButtonSelector);
        setButtonState(submitButton, form.checkValidity(), config);
    });
}
