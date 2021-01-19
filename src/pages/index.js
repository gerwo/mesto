import './index.css';

import {
  addCardButtonSelector,
  formAddNewCardSelector,
  addCardPopUpSelector,
  cardsNodeSelector,
  imageNodeSelector,
  cardImageSelector,
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
      renderLoading(button, 'delete');
      api.deleteCard({
          cardId : card._id
        })
        .then(() => {
          card.remove();
        })
        .catch((err) => {
          consoleLogError(err);
        })
        .finally(()=>{
          confirm.close();
          setTimeout(renderLoading, 1000, button, 'confirm');
        });
    }
  });
  
  confirm.setEventListeners()

  const editProfilePopup = new PopupWithForm({
    popupSelector: editPopUpSelector,
    handleFormSubmit : (inputsValues, button) => {
      
      renderLoading(button, 'saving');
      
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
        .catch((err) => {
          consoleLogError(err);
        })
        .finally(() => {
          editProfilePopup.close();
          setTimeout(renderLoading, 1000, button, 'save');
        });
    }
  });
  
  editProfilePopup.setEventListeners();

  const editAvatarPopup = new PopupWithForm({
    popupSelector: editAvatarPopupSelector,
    handleFormSubmit : (inputsValues, button) => {
      renderLoading(button, 'saving');
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
        .catch((err) => {
          consoleLogError(err);
        })
        .finally(() => {
          editAvatarPopup.close();
          setTimeout(renderLoading, 1000, button, 'save');
        });
    }
  });

  editAvatarPopup.setEventListeners();

  const addCardPopUp = new PopupWithForm({
    popupSelector: addCardPopUpSelector,
    handleFormSubmit : (inputsValues, button) => {  
      renderLoading(button, 'saving');
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
        .catch((err) => {
          consoleLogError(err);
        })
        .finally(() => {
          setTimeout(renderLoading, 1000, button, 'create');
          addCardPopUp.close();
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
      cardImageSelector,
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


  api.getCards()
    .then(result => {
      cardList.renderItems(result.reverse());
    })
    .catch((err) => {
      consoleLogError(err);
    });

  api.getUserInfo()
    .then(result => {
      userId = result._id;

      userInfo.setUserInfo({
        avatar : result.avatar,
        name : result.name,
        about : result.about
      });
    })
    .catch((err) => {
      consoleLogError(err);
    });

  const renderLoading = (button, status) => {
    switch(status){
      case 'delete' : 
        button.textContent = 'Удаление...';
        break;
      case 'confirm' : 
        button.textContent = 'Да';
        break;
      case 'create' : 
        button.textContent = 'Создать';
        break;
      case 'saving' : 
        button.textContent = 'Сохранение...';
        break;
      case 'save' : 
        button.textContent = 'Сохранить';
        break;
      default : 
        return;
    }
  };

  const consoleLogError = (err) => {
    console.log(err);
  };

  document.querySelector(editButtonAvatarSelector).addEventListener('click', openEditAvatarForm);
  document.querySelector(addCardButtonSelector).addEventListener('click', openAddCardForm);
  document.querySelector(editButtonSelector).addEventListener('click', openEditForm);
})();