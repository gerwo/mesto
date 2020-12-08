export default class Popup{

    constructor(popup){
        this._view = popup;
    }

    open = () => {
        this._view.addEventListener('click', this._searchCloseElementsAndClosePopup);

        document.addEventListener('keydown', this._hidePopupByPressEscape);

        this._view.classList.add('popup_opened');
    }

    close = () => {
        this._view.classList.remove('popup_opened');

        this._delete();
    }

    _delete = () => {
        this._view.removeEventListener('click', this._searchCloseElementsAndClosePopup);
        document.removeEventListener('keydown', this._hidePopupByPressEscape);
        this._view = null;
    }

    _searchCloseElementsAndClosePopup = (evt) => {
        const popup = this._popupActive();
    
        if(evt.target.classList.contains('popup') || evt.target.classList.contains('button_type_close')){
            this.close(popup);
        }
    }

    _hidePopupByPressEscape = (evt) => {
        const popup = this._popupActive();

        if(evt.key === "Escape"){
            this.close(popup);
        };
    }
    
    _popupActive = () => {
        const popup = document.querySelector('.popup_opened');
        return popup;
    }
}