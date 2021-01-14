import './index.css';

import {
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
} from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo';

(function(){

  const editProfileForm = document.querySelector(formEditeProfileSelector);
  const editeFormValifation = new FormValidator(editProfileForm, config, editPopUpSelector);

  const addCardForm = document.querySelector(formAddNewCardSelector)
  const newCardFormValidation = new FormValidator(addCardForm, config, addCardPopUpSelector);

  const userInfo = new UserInfo({
    nameSelector : fullNameSelector,
    jobSelector : occupationSelector
  });

  const editProfilePopup = new PopupWithForm({
    popupSelector: editPopUpSelector,
    handleFormSubmit : (inputsValues) => {
      
      userInfo.setUserInfo({
        name : inputsValues.name,
        job : inputsValues.occupation
      });

      console.log(userInfo.getUserInfo())

      editProfilePopup.close();
    }
  });
  
  editProfilePopup.setEventListeners();

  const addCardPopUp = new PopupWithForm({
    popupSelector: addCardPopUpSelector,
    handleFormSubmit : (inputsValues) => {  
      
      const imgLink = addCardForm.querySelector(imgLinkSelector);
      const imgTitle = addCardForm.querySelector(imgTitlSelector);
      
      const link = imgLink.value;
      const name = imgTitle.value;

      const card = createCard({name, link});
      
      cardList.addItem(card);

      imgTitle.value = '';
      imgLink.value = '';

      addCardPopUp.close();
    } 
  });

  addCardPopUp.setEventListeners();

  const cardList = new Section({
    renderer: (item) => {
      const card = createCard(item);
      
      cardList.addItem(card);
    }
  }, cardsNodeSelector);

  
  const createCard = ({name, link}) => {
    const card = new Card({
      cardTemplate,
      name,
      link,
      handleCardClick: ()=>{
        
        const popup = new PopupWithImage(imageNodeSelector);        
        
        popup.setEventListeners();
        
        popup.open({name, link});

      }});
      
      return card.generateCard();
  };

  const openAddCardForm = () => {
      
      newCardFormValidation.enableValidation();
      
      addCardPopUp.open();
  };

  const openEditForm = () => {   
    
    const profileData = userInfo.getUserInfo();
    
    document.querySelector(nameInputSelector).value = profileData.name;
    document.querySelector(jobInputSelector).value = profileData.job;

    editeFormValifation.enableValidation();

    editProfilePopup.open();
  };

  cardList.renderItems(initialCards);

  document.querySelector(addCardButtonSelector).addEventListener('click', openAddCardForm);
  document.querySelector(editButtonSelector).addEventListener('click', openEditForm);
})();