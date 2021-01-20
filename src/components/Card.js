export default class Card{

  constructor({cardTemplate, name, link, likes, _id, owner, cardImageSelector, handleCardClick, handleLikeClick, handleDeleteClick}, userId) {
    this._cardTemplate = cardTemplate;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = _id;
    this._owner = owner;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getView(){
    this._view = this._cardTemplate.cloneNode(true).children[0];
    return this._view;
  }

  _addCardFromTemplate() {
    this._element = this._getView();

    this._title = this._element.querySelector('.card__title');
    this._cardImage = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.button_type_like');
    this._likeCount = this._element.querySelector('.card__like-count');
    this._deleteButton = this._element.querySelector('.button_type_delete-card');
    
    this._title.textContent = this._name;    
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeCount.textContent = this._likes.length;
    
    if (this._owner._id !== this._userId) {
      this._deleteButton.remove();
    }

    if (this._likes.some(like => like._id === this._userId)) {
      this.likeCard();
    }
      
    return this._element;
  }

  _setEventsListeners() {
      
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({name : this._name, link: this._link});
    });
    
    this._likeButton.addEventListener('click', this._handleLikeClick);

    this._deleteButton.addEventListener('click', this._handleDeleteClick);
  }
  
  setLikesCount(count) {
    this._likeCount.textContent = count;
  }

  likeCard() {
    return this._likeButton.classList.toggle('button_type_like_active');
  }

  isLiked() {
    return this._likeButton.classList.contains('button_type_like_active');
  }

  removeCard() {
    this._view.remove();
    this._view = null;
  }

  generateCard() {
    const card = this._addCardFromTemplate();
    this._setEventsListeners();
    
    return card;
  }
}