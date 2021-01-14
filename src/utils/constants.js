//Cards
const addCardButtonSelector = '.button_type_add-card';
const addCardPopUpSelector = '.popup_add-new-card';
const cardsNodeSelector = '.cards__block';
const imageNodeSelector = '.popup_image-substrate';
const formAddNewCardSelector = '.popup__form_add-new-card';
const imgTitlSelector = '.popup__input_image-title';
const imgLinkSelector = '.popup__input_image-link';
const cardTemplate = document.querySelector('#card-template').content;

//Profile
const formEditeProfileSelector = '.popup__form_edite-profile';
const fullNameSelector = '.profile__full-name';
const nameInputSelector = '.popup__input_full-name';
const occupationSelector = '.profile__occupation';
const jobInputSelector = '.popup__input_occupation';
const editButtonSelector = '.button_type_edite-profile';
const editPopUpSelector = '.popup_edite-profile';

const config = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

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

export {
  addCardButtonSelector,
  formAddNewCardSelector,
  addCardPopUpSelector,
  cardsNodeSelector,
  imageNodeSelector,
  imgTitlSelector,
  imgLinkSelector,
  cardTemplate,
  formEditeProfileSelector,
  fullNameSelector,
  nameInputSelector,
  occupationSelector,
  jobInputSelector,
  editButtonSelector,
  editPopUpSelector,
  config,
  initialCards
}