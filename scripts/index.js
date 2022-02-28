import {initialCards} from "./initial-сards.js";
import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";

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
const templateCard = document.querySelector('.template-card');

const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'popup__error_active'
}

export function openPopup(popup) {
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

}

function openAddCardPopup() {
    openPopup(popupAddCard);
    //берутся значения на самой странице и добавлятся в попап, чтобы они совпадали
    inputCardName.value = '';
    inputCardLink.value = '';
    resetForm(popupAddCard);
}

function openImagePopup(src, title) {
    openPopup(popupImg);
    image.src = `${src}`;
    imageTitle.textContent = `${title}`;
    image.alt = `${title}`;
}

//функция обработки, сохранения имени и занятий в профиле
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputUserName.value;
    profileActivity.textContent = inputUserActivity.value;
    closePopup(popupEditProfile);

}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    addCard(createCard(inputCardName.value, inputCardLink.value));
    closePopup(popupAddCard);
    resetForm(popupAddCard);
}

function createCard(name, link) {
    const card = new Card(templateCard,name, link, openImagePopup);
    // Создаём карточку и возвращаем наружу
    return  card.generateCard();
}

function addCard(card) {
    cards.prepend(card);
}

// reset формы и удаление полей ошибок после закрытия попапа
function resetForm(popup) {
    const form = popup.querySelector('.popup__form');
    if (popup === popupAddCard) {
        addCardFormValidator.resetError();
        addCardFormValidator.stateButtonInactive();
    } else {
        editProfileFormValidator.resetError();
        editProfileFormValidator.stateButtonActive()
    }
    form.reset()
}

//обработка действий
formEditProfile.addEventListener('submit', handleProfileFormSubmit);
closeEditProfileBtn.addEventListener('click', () => closePopup(popupEditProfile));
openEditProfileBtn.addEventListener('click', openEditProfilePopup);

formAddCard.addEventListener('submit', handleCardFormSubmit);
closeAddCardBtn.addEventListener('click', () => closePopup(popupAddCard));
openAddCardBtn.addEventListener('click', openAddCardPopup);

closePopupImg.addEventListener('click', () => closePopup(popupImg));

initialCards.forEach((item) => {
    addCard(createCard(item.name, item.link));
});

const editProfileFormValidator = new FormValidator(validationConfig, popupEditProfile);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationConfig, popupAddCard);
addCardFormValidator.enableValidation();
