const config = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});



const popupList = document.querySelectorAll('.popup');
const addCardButton = document.querySelector('.button_type_add-card');
const formAddNewCard = document.querySelector('.popup__form_add-new-card');
const addCardPopUp = document.querySelector('.popup_add-new-card');
const cardTemplate = document.querySelector('#card-template');
const cardsNode = document.querySelector('.cards__block');
const imageNode = document.querySelector('.popup_image-substrate');
const imgTitle = formAddNewCard.querySelector('.popup__input_image-title');
const imgLink = formAddNewCard.querySelector('.popup__input_image-link');

const formEditeProfile = document.querySelector('.popup__form_edite-profile');
const fullName = document.querySelector('.profile__full-name');
const nameInput = document.querySelector('.popup__input_full-name');
const occupation = document.querySelector('.profile__occupation');
const jobInput = document.querySelector('.popup__input_occupation');
const editButton = document.querySelector('.button_type_edite-profile');
const editPopUp = document.querySelector('.popup_edite-profile');


const deleteNode = (node) => {
    node.remove();
}

const hidePopupByPressEscape = (evt, popup) => {
    if(evt.key === "Escape"){
        closePopup(popup);
    };
}

const openPopup = (popup) => {

    popup.addEventListener('click', (evt) => {   
        if(evt.target.classList.contains('popup') || evt.target.classList.contains('button_type_close')){
            closePopup(popup);
        }
    });

    document.addEventListener('keydown', (evt) => {
        hidePopupByPressEscape(evt, popup);
    });

    popup.classList.add('popup_opened');
}

const closePopup = (popup) => {

    popup.removeEventListener('click', closePopup);

    document.removeEventListener('keydown', hidePopupByPressEscape);

    popup.classList.remove('popup_opened');
}

const getSubmitButton = (form, config) => {
    return form.querySelector(config.submitButtonSelector)
}

const openAddCardForm = () => {
    
    deleteFormErrors(addCardPopUp);
    setButtonState(getSubmitButton(formAddNewCard, config), formAddNewCard.checkValidity(), config);    
    openPopup(addCardPopUp);
}

const openEditForm = () => {    
   
    deleteFormErrors(editPopUp);    
    
    nameInput.value = fullName.textContent;
    jobInput.value = occupation.textContent;

    setButtonState(getSubmitButton(formEditeProfile, config), formEditeProfile.checkValidity(), config);
    
    openPopup(editPopUp);
}


const addCardFromTemplate = (obj) => {
    const cardNode = cardTemplate.content.cloneNode(true);
    const cardImage = cardNode.querySelector('.card__image');

    cardNode.querySelector('.card__title').textContent = obj.name;
    
    cardImage.src = obj.link;
    cardImage.alt = obj.name;
    
    return cardNode;
}

const setEventsCard = (cardProps, card) => {

    card.querySelector('.card__image').addEventListener('click', () => {
        showImagePopup(cardProps.name, cardProps.link);
    });
    
    card.querySelector('.button_type_like').addEventListener('click', (evt) => {
        const theTarget = evt.target;
        theTarget.classList.toggle('button_type_like_active');
    });

    card.querySelector('.button_type_delete-card').addEventListener('click', (evt) => {
        const theTarget = evt.target.closest('.card');
        deleteNode(theTarget);
    });
}

const createCard = (cardObj) => {
    const card = addCardFromTemplate(cardObj);
    
    setEventsCard(cardObj, card);
    
    cardsNode.prepend(card);
}

const formSubmitNewCard = (evt) => {
    evt.preventDefault();

    const cardObj = {};

    cardObj.name = imgTitle.value;
    cardObj.link = imgLink.value;

    createCard(cardObj);

    closePopup(addCardPopUp);

    imgTitle.value = '';
    imgLink.value = '';
}

const formSubmitHandler = (evt) => {
    evt.preventDefault();

    fullName.textContent = nameInput.value;
    occupation.textContent = jobInput.value;

    closePopup(editPopUp);
}

const showImagePopup = (imageName, imageLink) => {
    
    const image = imageNode.querySelector('.popup__image');
    
    imageNode.querySelector('.popup__image-title').textContent = imageName;    
    image.src = imageLink;
    image.alt = imageName;

    openPopup(imageNode);
}

const renderInitialCards = (initialCards, position) => {
    initialCards.forEach((item) => {
        createCard(item, position);
    });
}

const enableValidation = (config) => {
    const forms = document.querySelectorAll(config.formSelector);

    forms.forEach((form) => {
        setInputEvents(form, config);
    });
}


enableValidation(config);
renderInitialCards(initialCards, 'append');

addCardButton.addEventListener('click', openAddCardForm);
editButton.addEventListener('click', openEditForm);
formEditeProfile.addEventListener('submit', formSubmitHandler);
formAddNewCard.addEventListener('submit', formSubmitNewCard);