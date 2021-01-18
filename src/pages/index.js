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
  avatarInput,
  occupationSelector,
  aboutInput,
  editButtonSelector,
  editPopUpSelector,
  config,
  popupConfirmSelector,
  avatarSelector,
  formEditAvatarSelector,
  editAvatarPopupSelector,
  editButtonAvatarSelector
} from '../utils/constants.js';

import Api from '../components/Api';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo';


(function(){

  const api = new Api({
    url : 'https://mesto.nomoreparties.co/v1/',
    token : 'a2645d68-6dae-4ace-a29b-319c06bb5839',
    group : 'cohort-19'
  });

  const userInfo = new UserInfo({
    avatarSelector : avatarSelector,
    nameSelector : fullNameSelector,
    aboutSelector : occupationSelector
  });

  const confirm = new PopupWithConfirm({
    popupSelector : popupConfirmSelector
  })
  

  const editProfilePopup = new PopupWithForm({
    popupSelector: editPopUpSelector,
    handleFormSubmit : (inputsValues) => {
      
      api.setUserInfo({
        name : inputsValues.name,
        about : inputsValues.occupation
      }).then((result)=>{

        userInfo.setUserInfo({
          avatar : result.avatar,
          name : result.name,
          about : result.about
        });
      });
    }
  });
  
  editProfilePopup.setEventListeners();

  const editAvatarPopup = new PopupWithForm({
    popupSelector: editAvatarPopupSelector,
    handleFormSubmit : (inputsValues) => {
      
      api.setUserAvatar({
        avatar : inputsValues.avatar
      }).then((result)=>{

        userInfo.setUserInfo({
          avatar : result.avatar,
          name : result.name,
          about : result.about
        });
      });
    }
  });

  editAvatarPopup.setEventListeners();

  const addCardPopUp = new PopupWithForm({
    popupSelector: addCardPopUpSelector,
    handleFormSubmit : (inputsValues) => {  
      
      const name = inputsValues['image-title'];
      const link = inputsValues['image-link']
      
      api.addCard({name, link}).then(result => {
        console.log(result);
        const card = createCard({
          name : result.name, 
          link : result.link
        });

        cardList.addItem(card);
      })
    } 
  });

  addCardPopUp.setEventListeners();

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


  const cardList = new Section({
    renderer: (item) => {
      const card = createCard(item);
      
      cardList.addItem(card);
    }
  }, cardsNodeSelector);

  const openAddCardForm = () => {
    
    newCardFormValidation.resetValidation();
    
    addCardPopUp.open();
  };

  const openEditForm = () => {   
    
    const profileData = userInfo.getUserInfo();
    
    nameInput.value = profileData.name;
    aboutInput.value = profileData.about;
    
    editeFormValifation.resetValidation();

    editProfilePopup.open();
  };

  const openEditAvatarForm = () => {
    
    editAvatarFormValidation.resetValidation();

    editAvatarPopup.open();

  }

  const editAvatarForm = document.querySelector(formEditAvatarSelector);
  
  const editAvatarFormValidation = new FormValidator({
    form : editAvatarForm, 
    config : config
  });
  
  editAvatarFormValidation.enableValidation();

  const editProfileForm = document.querySelector(formEditeProfileSelector);
  const editeFormValifation = new FormValidator({
    form : editProfileForm, 
    config : config
  });
  
  editeFormValifation.enableValidation();

  const addCardForm = document.querySelector(formAddNewCardSelector)
  const newCardFormValidation = new FormValidator({
    form : addCardForm, 
    config : config
  });
  
  newCardFormValidation.enableValidation();

  api.getCards().then(result => {
    cardList.renderItems(result.reverse());
  });

  api.getUserInfo().then(result => {
    userInfo.setUserInfo({
      avatar : result.avatar,
      name : result.name,
      about : result.about
    });
  })

  document.querySelector(editButtonAvatarSelector).addEventListener('click', openEditAvatarForm);
  document.querySelector(addCardButtonSelector).addEventListener('click', openAddCardForm);
  document.querySelector(editButtonSelector).addEventListener('click', openEditForm);
})();