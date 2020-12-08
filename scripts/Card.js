export default class Card{

    static template = document.querySelector('#card-template').content;

    constructor(cardObj, popup, popupNode) {
        this._cardObj = cardObj;
        this._popUp = popup;
        this._popupNode = popupNode;
    }

    _addCardFromTemplate = () => {
        this._view = Card.template.cloneNode(true).children[0];

        const cardImage = this._view.querySelector('.card__image');

        this._view.querySelector('.card__title').textContent = this._cardObj.name;
        
        cardImage.src = this._cardObj.link;
        cardImage.alt = this._cardObj.name;
        
        return this._view;
    }

    _setEventsListeners = () => {
        
        this._view.querySelector('.card__image').addEventListener('click', () => {
            this._showImagePopup();
        });
        
        this._view.querySelector('.button_type_like').addEventListener('click', (evt) => {
            const theTarget = evt.target;
            theTarget.classList.toggle('button_type_like_active');
        });
    
        this._view.querySelector('.button_type_delete-card').addEventListener('click', (evt) => {
            const theTarget = evt.target.closest('.card');
            this._delete(theTarget);
        });
    }

    _showImagePopup = () => {
        this._popupNode.querySelector('.popup__image-title').textContent = this._cardObj.name;  
        
        const image = this._popupNode.querySelector('.popup__image');
        
        image.src = this._cardObj.link;
        image.alt = this._cardObj.name;

        this._popUp(this._popupNode).open();
    }

    _delete = () => {
        this._view.remove();
        this._view = null;
    }

    _create = (card, cardsNode) => {
        cardsNode.prepend(card);
    }

    render = (cardsNode) => {
        const card = this._addCardFromTemplate();
        this._create(card, cardsNode);
        this._setEventsListeners();
        
    }
}