let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__closed');
let popupOpen = document.querySelector('.profile__button-change');
let popupForm = popup.querySelector('.popup__form');
let popupName = popup.querySelector('.popup__input_type_name');
let popupActivity = popup.querySelector('.popup__input_type_activity');

let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileActivity = profile.querySelector('.profile__activity');

function opened() {
    popup.classList.add('popup_opened');
    //берутся значения на самой странице и добавлятся в попап, чтобы они совпадали
    popupName.value = profileName.textContent;
    popupActivity.value = profileActivity.textContent;
}

function closed() {
    popup.classList.remove('popup_opened')
}

//функция обработки, сожранения имени и занятий в провиле
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileActivity.textContent = popupActivity.value;
    closed();
}

//обработка действий
popupForm.addEventListener('submit', formSubmitHandler);
popupClose.addEventListener('click', closed);
popupOpen.addEventListener('click', opened);
