import {initialCards} from "./initial-сards.js";
import {Card} from "./Card.js";
import {FormValidator} from "./validate.js";

const popupEditProfile = document.querySelector('.popup_edit-profile');
const closeEditProfileBtn = popupEditProfile.querySelector('.popup__closed');
const openEditProfileBtn = document.querySelector('.profile__button-change');
const formEditProfile = popupEditProfile.querySelector('.popup__formChange');
const inputUserName = popupEditProfile.querySelector('.popup__input_type_name');
const inputUserActivity = popupEditProfile.querySelector('.popup__input_type_activity');

const popupAddCard = document.querySelector('.popup_add-card');
const closeAddCardBtn = popupAddCard.querySelector('.popup__closed');
const openAddCardBtn = document.querySelector('.profile__button-add');
const formAddCard = popupAddCard.querySelector('.popup__formAdd');
const inputCardName = popupAddCard.querySelector('.popup__input_type_place');
const inputCardLink = popupAddCard.querySelector('.popup__input_type_link');

const popupImg = document.querySelector('.popup_image');
const image = popupImg.querySelector('.popup__image');
const imageTitle = popupImg.querySelector('.popup__image-title');
const closePopupImg = popupImg.querySelector('.popup__closed');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileActivity = profile.querySelector('.profile__activity');

const cards = document.querySelector('.cards');

const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'popup__error_active'
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
    document.addEventListener('click', closePopupOverlay);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', closePopupEsc);
    document.removeEventListener('click', closePopupOverlay);
}

function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'))
    }
}

function closePopupOverlay(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target);
    }
}

function openEditProfilePopup() {
    openPopup(popupEditProfile);
    resetForm(popupEditProfile);
    //берутся значения на самой странице и добавлятся в попап, чтобы они совпадали
    inputUserName.value = profileName.textContent;
    inputUserActivity.value = profileActivity.textContent;
    /*stateButton(Array.from(popupAddCard.querySelectorAll(obj.inputSelector)),
        popupAddCard.querySelector(obj.submitButtonSelector), obj.inactiveButtonClass);*/
}

function openAddCardPopup() {
    openPopup(popupAddCard);
    //берутся значения на самой странице и добавлятся в попап, чтобы они совпадали
    inputCardName.value = '';
    inputCardLink.value = '';
    resetForm(popupAddCard);
    /*stateButton(Array.from(popupAddCard.querySelectorAll(obj.inputSelector)),
        popupAddCard.querySelector(obj.submitButtonSelector), obj.inactiveButtonClass);*/
}

function openImagePopup(src, title) {
    openPopup(popupImg);
    image.src = `${src}`;
    imageTitle.textContent = `${title}`;
    image.alt = `${title}`;
}

//функция обработки, сожранения имени и занятий в провиле
function formEditProfileSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputUserName.value;
    profileActivity.textContent = inputUserActivity.value;
    closePopup(popupEditProfile);
}

function formAddCardSubmitHandler(evt) {
    evt.preventDefault();
    const card = new Card(inputCardName.value, inputCardLink.value, openImagePopup);
    const cardElements = card.generateCard();
    addCard(cardElements);
    closePopup(popupAddCard);
}

function addCard(card) {
    cards.prepend(card);
}

// reset формы и удаление полей ошибок после закрытия попапа
function resetForm(popup) {
    const form = popup.querySelector('.popup__form');
    const saveButton = popup.querySelector('.popup__button-save');
    const inputList = form.querySelectorAll('.popup__input');
    inputList.forEach((data) => {
        data.classList.remove('form__input_type_error');
        popup.querySelector(`.${data.id}-error`).classList.remove('popup__error_active');
    });
    if (popup === popupAddCard) {
        saveButton.classList.add(validationConfig.inactiveButtonClass);
        saveButton.setAttribute('disabled', true);
    } else {
        saveButton.classList.remove(validationConfig.inactiveButtonClass);
        saveButton.removeAttribute('disabled');
    }
    form.reset()
}

//обработка действий
formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
closeEditProfileBtn.addEventListener('click', () => closePopup(popupEditProfile));
openEditProfileBtn.addEventListener('click', openEditProfilePopup);

formAddCard.addEventListener('submit', formAddCardSubmitHandler);
closeAddCardBtn.addEventListener('click', () => closePopup(popupAddCard));
openAddCardBtn.addEventListener('click', openAddCardPopup);

closePopupImg.addEventListener('click', () => closePopup(popupImg));

initialCards.forEach((item) => {
    // Создадим экземпляр карточки
    const card = new Card(item.name, item.link, openImagePopup);
    // Создаём карточку и возвращаем наружу
    const cardElements = card.generateCard();
    // Добавляем в DOM
    addCard(cardElements);
});

const editFormValidator = new FormValidator(validationConfig, popupEditProfile);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, popupAddCard);
addFormValidator.enableValidation();
