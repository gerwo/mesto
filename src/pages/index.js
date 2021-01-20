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

  const editAvatarForm = document.querySelector(formEditAvatarSelector);
  const editProfileForm = document.querySelector(formEditeProfileSelector);
  const addCardForm = document.querySelector(formAddNewCardSelector);

  let userId;

  const api = new Api({
    url : 'https://mesto.nomoreparties.co/v1/cohort-19',
    headers :{
      authorization : 'a2645d68-6dae-4ace-a29b-319c06bb5839',
      'Content-Type' : 'application/json'
    }
  });

  const userInfo = new UserInfo({
    avatarSelector : avatarSelector,
    nameSelector : fullNameSelector,
    aboutSelector : occupationSelector
  });

  const confirm = new PopupWithConfirm({
    popupSelector : popupConfirmSelector,
    handleConfirmSubmit : (card, button) => {
      renderLoading(button, 'Удаление...');
      api.deleteCard({
          cardId : card._id
        })
        .then(() => {
          card.removeCard();
        })
        .then(() => {
          confirm.close();
          setTimeout(renderLoading, 1000, button, 'Да');
        })
        .catch((err) => {
          consoleLogError(err);
        });
    }
  });
  
  confirm.setEventListeners()

  const editProfilePopup = new PopupWithForm({
    popupSelector: editPopUpSelector,
    handleFormSubmit : (inputsValues, button) => {
      
      renderLoading(button, 'Сохранение...');
      
      api.setUserInfo({
        name : inputsValues.name,
        about : inputsValues.occupation
      })
        .then((result)=>{
          userInfo.setUserInfo({
            avatar : result.avatar,
            name : result.name,
            about : result.about
          });
        })
        .then(() => {
          editProfilePopup.close();
          setTimeout(renderLoading, 1000, button, 'Сохранить');
        })
        .catch((err) => {
          consoleLogError(err);
        });
    }
  });
  
  editProfilePopup.setEventListeners();

  const editAvatarPopup = new PopupWithForm({
    popupSelector: editAvatarPopupSelector,
    handleFormSubmit : (inputsValues, button) => {
      renderLoading(button, 'Сохранение...');
      api.setUserAvatar({
        avatar : inputsValues.avatar
      })
        .then((result)=>{

          userInfo.setUserInfo({
            avatar : result.avatar,
            name : result.name,
            about : result.about
          });
        })
        .then(() => {
          editAvatarPopup.close();
          setTimeout(renderLoading, 1000, button, 'Сохранить');
        })
        .catch((err) => {
          consoleLogError(err);
        });
    }
  });

  editAvatarPopup.setEventListeners();

  const addCardPopUp = new PopupWithForm({
    popupSelector: addCardPopUpSelector,
    handleFormSubmit : (inputsValues, button) => {  
      renderLoading(button, 'Сохранение...');
      const name = inputsValues['image-title'];
      const link = inputsValues['image-link'];
      
      api.addCard({name, link})
        .then(result => {
          const card = createCard({
            name : result.name, 
            link : result.link,
            likes : result.likes,
            _id : result._id,
            owner : result.owner
          });

          cardList.addItem(card);
        })
        .then(() => {
          setTimeout(renderLoading, 1000, button, 'Создать');
          addCardPopUp.close();
        })
        .catch((err) => {
          consoleLogError(err);
        });
    } 
  });

  addCardPopUp.setEventListeners();

  const popupImage = new PopupWithImage(imageNodeSelector);        
  popupImage.setEventListeners();

  const createCard = ({name, link, likes, _id, owner}) => {

    const card = new Card({
      cardTemplate,
      name,
      link,
      likes,
      _id,
      owner,
      handleCardClick: ()=>{                
        popupImage.open({name, link});
      },
      handleLikeClick: () => {
        if(!card.isLiked()){
          api.likeCard({cardId : card._id})
            .then((result) => {
              card.setLikesCount(result.likes.length);
              card.likeCard();
            })
            .catch((err) => {
              consoleLogError(err);
            });
        }
        else{
          console.log(card._id);
          api.unlikeCard({cardId : card._id})
            .then((result) => {
              console.log(result.likes.length)
              card.setLikesCount(result.likes.length);
              card.likeCard();
            })
            .catch((err) => {
              consoleLogError(err);
            });
        }
      },
      handleDeleteClick: () => {
        confirm.open(card);
      }    
    }, userId);
      
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

  };

  
  const editAvatarFormValidation = new FormValidator({
    form : editAvatarForm, 
    config : config
  });
  
  editAvatarFormValidation.enableValidation();

  const editeFormValifation = new FormValidator({
    form : editProfileForm, 
    config : config
  });
  
  editeFormValifation.enableValidation();

  const newCardFormValidation = new FormValidator({
    form : addCardForm, 
    config : config
  });  
  
  newCardFormValidation.enableValidation();

  
  Promise.all([
    api.getUserInfo(),
    api.getCards()
  ])    
  .then((values)=>{
      const [userData, initialCards] = values;

      userId = userData._id;

      userInfo.setUserInfo({
        avatar : userData.avatar,
        name : userData.name,
        about : userData.about
      });

      cardList.renderItems(initialCards.reverse());
      
  })
  .catch((err)=>{ 
      console.log(err);
  });  

  const renderLoading = (button, status) => {
    button.textContent = status;
  };

  const consoleLogError = (err) => {
    console.log(err);
  };

  document.querySelector(editButtonAvatarSelector).addEventListener('click', openEditAvatarForm);
  document.querySelector(addCardButtonSelector).addEventListener('click', openAddCardForm);
  document.querySelector(editButtonSelector).addEventListener('click', openEditForm);
})();