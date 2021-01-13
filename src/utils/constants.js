//элементы секции cards
const addCardButton = document.querySelector('.button_type_add-card');
const formAddNewCard = document.querySelector('.popup__form_add-new-card');
const addCardPopUp = document.querySelector('.popup_add-new-card');
const cardsNode = document.querySelector('.cards__block');
const imageNode = document.querySelector('.popup_image-substrate');
const imgTitle = formAddNewCard.querySelector('.popup__input_image-title');
const imgLink = formAddNewCard.querySelector('.popup__input_image-link');
const cardTemplate = document.querySelector('#card-template').content;

//элементы секции profile
const formEditeProfile = document.querySelector('.popup__form_edite-profile');
const fullName = document.querySelector('.profile__full-name');
const nameInput = document.querySelector('.popup__input_full-name');
const occupation = document.querySelector('.profile__occupation');
const jobInput = document.querySelector('.popup__input_occupation');
const editButton = document.querySelector('.button_type_edite-profile');
const editPopUp = document.querySelector('.popup_edite-profile');

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
  addCardButton,
  formAddNewCard,
  addCardPopUp,
  cardsNode,
  imageNode,
  imgTitle,
  imgLink,
  cardTemplate,
  formEditeProfile,
  fullName,
  nameInput,
  occupation,
  jobInput,
  editButton,
  editPopUp,
  config,
  initialCards
}