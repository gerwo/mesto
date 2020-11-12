const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const addCardButton = document.querySelector('.button_type_add-card');
const formAddNewCard = document.querySelector('.popup__form_add-new-card');
const addCardPopUp = document.querySelector('.popup_add-new-card');
const cardTemplate = document.querySelector('#card-template');
const cardsNode = document.querySelector('.cards__block');
const imageNode = document.querySelector('.popup_image-substrate');

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

const visiblePopUp = (node) => {
    node.classList.toggle('popup_opened');
}

const openAddCardForm = () => {
    visiblePopUp(addCardPopUp);
}

const openEditForm = () => {    
    nameInput.value = fullName.textContent;
    jobInput.value = occupation.textContent;

    visiblePopUp(editPopUp);
}

const createCardOnPosition = (node, position) => {
    position === 'append' ? cardsNode.append(node) : cardsNode.prepend(node);
}

const addCardFromTemplate = (obj) => {
    const cardNode = cardTemplate.content.cloneNode(true);
    const cardImage = cardNode.querySelector('.card__image');

    cardNode.querySelector('.card__title').textContent = obj.name;
    
    cardImage.src = obj.link;
    cardImage.alt = obj.name;
    
    return cardNode;
}

const setEventsCard = (obj, node) => {

    node.querySelector('.card__image').addEventListener('click', () => {
        showImagePopup(obj.name, obj.link);
    });
    
    node.querySelector('.button_type_like').addEventListener('click', (evt) => {
        const theTarget = evt.target;
        theTarget.classList.toggle('button_type_like_active');
    });

    node.querySelector('.button_type_delete-card').addEventListener('click', (evt) => {
        const theTarget = evt.target.closest('.card');
        deleteNode(theTarget)
    });
}

const createCard = (obj, position) => {
    const node = addCardFromTemplate(obj);
    
    setEventsCard(obj, node);
    createCardOnPosition(node, position);
}

const formSubmitNewCard = (evt) => {
    evt.preventDefault();

    let cardObj = {};
    
    const imgTitle = formAddNewCard.querySelector('.popup__input_image-title');
    const imgLink = formAddNewCard.querySelector('.popup__input_image-link');

    cardObj.name = imgTitle.value;
    cardObj.link = imgLink.value;

    createCard(cardObj, 'prepend');

    visiblePopUp(addCardPopUp);

    imgTitle.value = '';
    imgLink.value = '';
}

const formSubmitHandler = (evt) => {
    evt.preventDefault();

    fullName.textContent = nameInput.value;
    occupation.textContent = jobInput.value;

    visiblePopUp(editPopUp);
}

const showImagePopup = (name, link) => {
    
    const image = imageNode.querySelector('.popup__image');
    
    imageNode.querySelector('.popup__image-title').textContent = name;    
    image.src = link;
    image.alt = name;

    visiblePopUp(imageNode);
}

const renderInitialCards = (mass, position) => {
    mass.forEach((item) => {
        createCard(item, position);
    });
}

document.querySelectorAll('.button_type_close').forEach(item => {
    item.addEventListener('click', (evt) => {   
        const theTarget = evt.target.closest('.popup'); 
        visiblePopUp(theTarget);
    });
});

addCardButton.addEventListener('click', openAddCardForm);
editButton.addEventListener('click', openEditForm);
formEditeProfile.addEventListener('submit', formSubmitHandler);
formAddNewCard.addEventListener('submit', formSubmitNewCard);

renderInitialCards(initialCards, 'append');