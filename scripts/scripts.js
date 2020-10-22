let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__full-name');
let jobInput = formElement.querySelector('.popup__occupation');

let fullName = document.querySelector('.profile__full-name');
let occupation = document.querySelector('.profile__occupation');

let closeButton = document.querySelector('.popup__close');
let editButton = document.querySelector('.edit-button');
let popUp = document.querySelector('.popup');

function openEditForm(){
    nameInput.value = fullName.innerText;
    jobInput.value = occupation.innerText;

    visiblePopUp();
}

function formSubmitHandler(evt){
    evt.preventDefault();

    fullName.innerText = nameInput.value;
    occupation.innerText = jobInput.value;

    visiblePopUp();
}

function visiblePopUp(){
    popUp.classList.toggle('popup___opened');
}

editButton.addEventListener('click', openEditForm);
closeButton.addEventListener('click', visiblePopUp);
formElement.addEventListener('submit', formSubmitHandler);