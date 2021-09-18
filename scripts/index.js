
function opened() {
    popup.classList.add('popup__opened')
    //берутся значения на самой странице и добавлятся в попап, чтобы они совпадали
    let popupName = popup.querySelector('.popup__input-name');
    let popupActivity = popup.querySelector('.popup__input-activity')
    popupName.value = profileName.textContent;
    popupActivity.value = profileActivity.textContent;
}

function closed() {
    popup.classList.remove('popup__opened')
}
//функция обработки, сожранения имени и занятий в провиле
function formSubmitHandler (evt) {
    evt.preventDefault();

    let popupName = popup.querySelector('.popup__input-name');
    let popupActivity = popup.querySelector('.popup__input-activity')

    profileName.textContent = popupName.value;
    profileActivity.textContent = popupActivity.value;

    closed();
}
let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__closed');
let popupOpen = document.querySelector('.profile__button-change');
let popupSave = popup.querySelector('.popup__button-save');

let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileActivity = profile.querySelector('.profile__activity');

//обработка действий
popupClose.addEventListener('click', closed);
popupOpen.addEventListener('click', opened);
popup.addEventListener('submit', formSubmitHandler);