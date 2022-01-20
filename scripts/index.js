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

const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.cards');

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
    //берутся значения на самой странице и добавлятся в попап, чтобы они совпадали
    inputUserName.value = profileName.textContent;
    inputUserActivity.value = profileActivity.textContent;
    resetForm(popupEditProfile);
    stateButton(Array.from(popupEditProfile.querySelectorAll(obj.inputSelector)),
        popupEditProfile.querySelector(obj.submitButtonSelector), obj.inactiveButtonClass);
}

function openAddCardPopup() {
    openPopup(popupAddCard);
    //берутся значения на самой странице и добавлятся в попап, чтобы они совпадали
    inputCardName.value = '';
    inputCardLink.value = '';
    resetForm(popupAddCard);
    stateButton(Array.from(popupAddCard.querySelectorAll(obj.inputSelector)),
        popupAddCard.querySelector(obj.submitButtonSelector), obj.inactiveButtonClass);
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
    addCard(createCard(inputCardName.value, inputCardLink.value));
    closePopup(popupAddCard);
}

function createCard(place, link) {
    const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
    const image = cardElement.querySelector('.cards__image');
    cardElement.querySelector('.cards__title').textContent = `${place}`;
    image.src = `${link}`;
    image.alt = `${place}`;
    image.addEventListener('click', function () {
        openImagePopup(image.src, image.alt);
    });
    cardElement.querySelector('.cards__button-like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('song__button-like_active');
    });
    const deleteButton = cardElement.querySelector('.cards__button-delete');
    deleteButton.addEventListener('click', function () {
        const listItem = deleteButton.closest('.cards__item');
        listItem.remove();
    });
    return (cardElement);
}

function addCard(card) {
    cards.prepend(card);
}

for (let i = 0; i < initialCards.length; i++) {
    addCard(createCard(initialCards[i].name, initialCards[i].link))
};


//обработка действий
formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
closeEditProfileBtn.addEventListener('click', () => closePopup(popupEditProfile));
openEditProfileBtn.addEventListener('click', openEditProfilePopup);

formAddCard.addEventListener('submit', formAddCardSubmitHandler);
closeAddCardBtn.addEventListener('click', () => closePopup(popupAddCard));
openAddCardBtn.addEventListener('click', openAddCardPopup);

closePopupImg.addEventListener('click', () => closePopup(popupImg));
