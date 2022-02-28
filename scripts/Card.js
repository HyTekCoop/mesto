export class Card {

    constructor(template, place, link, openImagePopup) {
        this._link = link;
        this._place = place;
        this._openImagePopup = openImagePopup;
        this._cardTemplate = template;
    }

    _getTemplate() {
        // забираем разметку из HTML и клонируем элемент
        const cardElement = document
            .querySelector(this._cardTemplate)
            .content
            .querySelector('.cards__item')
            .cloneNode(true);
        // вернём DOM-элемент карточки
        return cardElement;
    }

    _setEventListener() {
        this._element.querySelector('.cards__image').addEventListener('click', () => {
            this._handleOpenPopup();
        });

        this._element.querySelector('.cards__button-delete').addEventListener('click', () => {
            this._handleDeleteButton();
        });

        this._element.querySelector('.cards__button-like').addEventListener('click', (evt) => {
            this._handleLikeButton(evt);
        });

    }

    _handleDeleteButton() {
        this._element.remove();
    }

    _handleLikeButton(evt) {
        evt.target.classList.toggle('song__button-like_active');
    }

    _handleOpenPopup() {
        this._openImagePopup(this._link, this._place);
    }

    generateCard() {

        this._element = this._getTemplate();
        const image = this._element.querySelector('.cards__image');
        image.src = this._link;
        image.alt = this._place;
        this._element.querySelector('.cards__title').textContent = this._place;
        this._setEventListener();
        return (this._element);

    }
}
