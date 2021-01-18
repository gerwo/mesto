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

  let userId;

  const api = new Api({
    url : 'https://mesto.nomoreparties.co/v1/cohort-19',
    token : 'a2645d68-6dae-4ace-a29b-319c06bb5839',
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
        });;
    }
  });
  
  editProfilePopup.setEventListeners();

  const editAvatarPopup = new PopupWithForm({
    popupSelector: editAvatarPopupSelector,
    handleFormSubmit : (inputsValues) => {
      
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
        });;
    }
  });

  editAvatarPopup.setEventListeners();

  const addCardPopUp = new PopupWithForm({
    popupSelector: addCardPopUpSelector,
    handleFormSubmit : (inputsValues) => {  
      
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
      handleLikeClick: (cardId) => {
        if(card.isLiked){
          api.likeCard({cardId})
            .then((result) => {
            })
            .catch((err) => {
              consoleLogError(err);
            })
        }
        else{
          api.unlikeCard({cardId})
            .then((result) => {
           })
           .catch((err) => {
            consoleLogError(err);
          })
        }
      },
      handleDeleteClick: (cardId) => {

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

  const renderLoading = (button, isLoading) => {
    return isLoading ? button.textContent = 'Сохранение...' : button.textContent = 'Сохранить';
  };

  const consoleLogError = (err) => {
    console.log(err)
  }


  document.querySelector(editButtonAvatarSelector).addEventListener('click', openEditAvatarForm);
  document.querySelector(addCardButtonSelector).addEventListener('click', openAddCardForm);
  document.querySelector(editButtonSelector).addEventListener('click', openEditForm);
})();