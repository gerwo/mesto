export default class Card{

    constructor(template, cardObj, func) {
        this._template = template;
        this._cardObj = cardObj;
        this._func = func;
    }

    _addCardFromTemplate() {
        this._view = this._template.cloneNode(true).children[0];

        const cardImage = this._view.querySelector('.card__image');

        this._view.querySelector('.card__title').textContent = this._cardObj.name;
        
        cardImage.src = this._cardObj.link;
        cardImage.alt = this._cardObj.name;
        
        return this._view;
    }

    _setEventsListeners() {
        
        this._view.querySelector('.card__image').addEventListener('click', () => {
            this._func(this._cardObj);
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