let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_margin_m');
let jobInput = formElement.querySelector('.popup__input_margin_s');

let fullName = document.querySelector('.profile__full-name');
let occupation = document.querySelector('.profile__occupation');

let closeButton = document.querySelector('.button_type_close');
let editButton = document.querySelector('.button_type_edite-profile');
let popUp = document.querySelector('.popup');


function visiblePopUp(){
    popUp.classList.toggle('popup_opened');
}

function openEditForm(){
    nameInput.value = fullName.textContent;
    jobInput.value = occupation.textContent;

    visiblePopUp();
}

function formSubmitHandler(evt){
    evt.preventDefault();

    fullName.textContent = nameInput.value;
    occupation.textContent = jobInput.value;

    visiblePopUp();
}

editButton.addEventListener('click', openEditForm);
closeButton.addEventListener('click', visiblePopUp);
formElement.addEventListener('submit', formSubmitHandler);