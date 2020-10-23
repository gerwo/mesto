const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_margin_m');
const jobInput = formElement.querySelector('.popup__input_margin_s');

const fullName = document.querySelector('.profile__full-name');
const occupation = document.querySelector('.profile__occupation');

const closeButton = document.querySelector('.button_type_close');
const editButton = document.querySelector('.button_type_edite-profile');
const popUp = document.querySelector('.popup');


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