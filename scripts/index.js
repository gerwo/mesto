import config from './config.js'
import initialCards from './initial-cards.js'
import Card from './Card.js'
import Popup from './Popup.js'
import FormValidator from './FormValidator.js';

(function(){

    const addCardButton = document.querySelector('.button_type_add-card');
    const formAddNewCard = document.querySelector('.popup__form_add-new-card');
    const addCardPopUp = document.querySelector('.popup_add-new-card');
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

    const editeFormValifation = new FormValidator(formEditeProfile, config, editPopUp);
    const newCardFormValidation = new FormValidator(formAddNewCard, config, addCardPopUp);

    let currentPopup;

    const popUp = (...args) => new Popup(...args);

    const newCard = (item) => {
        return new Card(item, popUp, imageNode).render(cardsNode);
    }
    const newPopup = (node) => {
        return new Popup(node);
    }

    const renderInitialCards = (initialCards) => {
        initialCards.forEach((item) => {
            const card = newCard(item);
        });
    }

    const openAddCardForm = () => {   
        
        formAddNewCard.reset();

        newCardFormValidation.enableValidation();

        currentPopup = newPopup(addCardPopUp);
        currentPopup.open();
    }

    const openEditForm = () => {    
        
        nameInput.value = fullName.textContent;
        jobInput.value = occupation.textContent;

        editeFormValifation.enableValidation();

        currentPopup = newPopup(editPopUp);
        currentPopup.open();
    }

    const formSubmitNewCard = (evt) => {
        evt.preventDefault();

        const cardObj = {};

        cardObj.name = imgTitle.value;
        cardObj.link = imgLink.value;

        const card = newCard(cardObj);

        currentPopup.close();

        imgTitle.value = '';
        imgLink.value = '';
    }

    const formSubmitHandler = (evt) => {
        evt.preventDefault();

        fullName.textContent = nameInput.value;
        occupation.textContent = jobInput.value;

        currentPopup.close();
    }

    addCardButton.addEventListener('click', openAddCardForm);
    editButton.addEventListener('click', openEditForm);
    formEditeProfile.addEventListener('submit', formSubmitHandler);
    formAddNewCard.addEventListener('submit', formSubmitNewCard);
    
    renderInitialCards(initialCards);
})();