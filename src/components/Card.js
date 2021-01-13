export default class Card{

  constructor({cardTemplate, name, link, handleCardClick}) {
    this._cardTemplate = cardTemplate;
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
  }

  _addCardFromTemplate() {
    this._view = this._cardTemplate.cloneNode(true).children[0];

    const cardImage = this._view.querySelector('.card__image');

    this._view.querySelector('.card__title').textContent = this._name;
    
    cardImage.src = this._link;
    cardImage.alt = this._name;
      
      return this._view;
  }

  _setEventsListeners() {
      
    this._view.querySelector('.card__image').addEventListener('click', () => {
        this._handleCardClick();
    });
    
    this._view.querySelector('.button_type_like').addEventListener('click', (evt) => {
        evt.target.classList.toggle('button_type_like_active');
    });

    this._view.querySelector('.button_type_delete-card').addEventListener('click', (evt) => {
        const theTarget = evt.target.closest('.card');
        this._delete(theTarget);
    });
  }

  _delete() {
    this._view.remove();
    this._view = null;
  }

  generateCard() {
    const card = this._addCardFromTemplate();
    this._setEventsListeners();
    
    return card;
  }
}