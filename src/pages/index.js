import './index.css';

import {
  addCardButtonSelector,
  formAddNewCardSelector,
  addCardPopUpSelector,
  cardsNodeSelector,
  imageNodeSelector,
  cardTemplate,
  formEditeProfileSelector,
  fullNameSelector,
  nameInput,
  occupationSelector,
  jobInput,
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
    }
  });
  
  editProfilePopup.setEventListeners();

  const addCardPopUp = new PopupWithForm({
    popupSelector: addCardPopUpSelector,
    handleFormSubmit : (inputsValues) => {  
      console.log(inputsValues)
      const card = createCard({
        name : inputsValues['image-title'], 
        link : inputsValues['image-link']
      });
      
      cardList.addItem(card);

    } 
  });

  addCardPopUp.setEventListeners();

  const editProfileForm = document.querySelector(formEditeProfileSelector);
  const editeFormValifation = new FormValidator({
    form : editProfileForm, 
    config : config,
    popup : editProfilePopup
  });
  
  editeFormValifation.enableValidation();

  const addCardForm = document.querySelector(formAddNewCardSelector)
  const newCardFormValidation = new FormValidator({
    form : addCardForm, 
    config : config,
    popup: addCardPopUpSelector
  });
  
  newCardFormValidation.enableValidation();

  const cardList = new Section({
    renderer: (item) => {
      const card = createCard(item);
      
      cardList.addItem(card);
    }
  }, cardsNodeSelector);

  const popupImage = new PopupWithImage(imageNodeSelector);        
  popupImage.setEventListeners();
  
  const createCard = ({name, link}) => {
    const card = new Card({
      cardTemplate,
      name,
      link,
      handleCardClick: ()=>{                
        popupImage.open({name, link});
      }});
      
      return card.generateCard();
  };

  const openAddCardForm = () => {
    
    newCardFormValidation.resetValidation();
    
    addCardPopUp.open();
  };

  const openEditForm = () => {   
    
    const profileData = userInfo.getUserInfo();
    
    nameInput.value = profileData.name;
    jobInput.value = profileData.job;
    
    editeFormValifation.resetValidation();

    editProfilePopup.open();
  };

  cardList.renderItems(initialCards);

  document.querySelector(addCardButtonSelector).addEventListener('click', openAddCardForm);
  document.querySelector(editButtonSelector).addEventListener('click', openEditForm);
})();