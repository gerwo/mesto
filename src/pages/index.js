import './index.css';

import {
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
} from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo';

(function(){

  const editeFormValifation = new FormValidator(formEditeProfile, config, editPopUp);
  const newCardFormValidation = new FormValidator(formAddNewCard, config, addCardPopUp);


  /*const userInfo = new UserInfo({
    nameSelector : nameInput,
    jobSelector : jobInput
  });*/

  const cardList = new Section({
    renderer: (item) => {
      const card = createCard(item);
      
      cardList.addItem(card);
    }
  }, cardsNode);

  const createCard = ({name, link}) => {
    const card = new Card({
      cardTemplate,
      name,
      link,
      handleCardClick: ()=>{
        const popup = new PopupWithImage(imageNode);
        popup.setEventListeners();

        popup.open({name, link});
      }});
      
      return card.generateCard();
  };

  const formSubmitNewCard = (evt) => {
    evt.preventDefault();

    const link = imgLink.value;
    const name = imgTitle.value;

    const card = createCard({name, link});
    
    cardList.addItem(card);

    imgTitle.value = '';
    imgLink.value = '';
  };

  cardList.renderItems(initialCards);


  const openAddCardForm = () => {
      
      formAddNewCard.reset();
      newCardFormValidation.enableValidation();
      const popup = new PopupWithForm(addCardPopUp);
      popup.setEventListeners();
      popup.open();
  };

  const openEditForm = () => {    
      
      nameInput.value = fullName.textContent;
      jobInput.value = occupation.textContent;

      editeFormValifation.enableValidation();

      const popup = new PopupWithForm(editPopUp);
      popup.setEventListeners();
      popup.open();
  };

  const formSubmitHandler = (evt) => {
      evt.preventDefault();

      fullName.textContent = nameInput.value;
      occupation.textContent = jobInput.value;
  };


  addCardButton.addEventListener('click', openAddCardForm);
  editButton.addEventListener('click', openEditForm);
  formEditeProfile.addEventListener('submit', formSubmitHandler);
  formAddNewCard.addEventListener('submit', formSubmitNewCard);
})();