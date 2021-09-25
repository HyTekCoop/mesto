let popupChange = document.querySelector('.popupChange');
let popupClose = popupChange.querySelector('.popup__closed');
let popupOpen = document.querySelector('.profile__button-change');
let popupForm = popupChange.querySelector('.popup__formChange');
let popupName = popupChange.querySelector('.popup__input_type_name');
let popupActivity = popupChange.querySelector('.popup__input_type_activity');

let popupAdd = document.querySelector('.popupAdd');
let popupAddClose = popupAdd.querySelector('.popup__closed');
let popupAddOpen = document.querySelector('.profile__button-add');
let popupAddForm = popupAdd.querySelector('.popup__formAdd');
let popupAddPlace = popupAdd.querySelector('.popup__input_type_place');
let popupAddLink = popupAdd.querySelector('.popup__input_type_link');

let popupImg = document.querySelector('.popupImg');
let image = popupImg.querySelector('.popup__image');
let imageTitle = popupImg.querySelector('.popup__image-title');

let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileActivity = profile.querySelector('.profile__activity');

const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.cards');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function openedPopupChange() {
    popupChange.classList.add('popup_opened');
    //берутся значения на самой странице и добавлятся в попап, чтобы они совпадали
    popupName.value = profileName.textContent;
    popupActivity.value = profileActivity.textContent;
}

function closedPopupChange() {
    popupChange.classList.remove('popup_opened')
}

//функция обработки, сожранения имени и занятий в провиле
function formSubmitPopupChange(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileActivity.textContent = popupActivity.value;
    closedPopupChange();
}

function openedPopupAdd() {
    popupAdd.classList.add('popup_opened');
}

function closedPopupAdd() {
    popupAdd.classList.remove('popup_opened')
}

//функция обработки, сожранения имени и занятий в провиле
function formSubmitPopupAdd(evt) {
    evt.preventDefault();
    closedPopupAdd();
    AddCard(popupAddPlace.value, popupAddLink.value);
    popupAddPlace.value = '';
    popupAddLink.value = '';
}

function openedPopupImg(src, title) {
    popupImg.classList.add('popup_opened');
    image.src = `${src}`;
    imageTitle.textContent = `${title}`;
}

function closedPopupImg() {
    popupImg.classList.remove('popup_opened')
}

function AddCard(place, link) {
    const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
    cardElement.querySelector('.cards__title').textContent = `${place}`;
    cardElement.querySelector('.cards__image').src = `${link}`;
    cards.prepend(cardElement);
    cardElement.querySelector('.cards__button-like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('song__button-like_active');
    })
    cardElement.querySelector('.cards__image').addEventListener('click', function () {
        openedPopupImg(cardElement.querySelector('.cards__image').src, cardElement.querySelector('.cards__title').textContent);
    })
    const deleteButton = document.querySelector('.cards__button-delete');
    deleteButton.addEventListener('click', function () {
        const listItem = deleteButton.closest('.cards__item');
        listItem.remove();
    });
}

for (let i = 0; i < initialCards.length; i++) {
    AddCard(initialCards[i].name, initialCards[i].link)
};

//обработка действий
popupForm.addEventListener('submit', formSubmitPopupChange);
popupClose.addEventListener('click', closedPopupChange);
popupOpen.addEventListener('click', openedPopupChange);

popupAddForm.addEventListener('submit', formSubmitPopupAdd);
popupAddClose.addEventListener('click', closedPopupAdd);
popupAddOpen.addEventListener('click', openedPopupAdd);

popupImg.addEventListener('click', closedPopupImg);
