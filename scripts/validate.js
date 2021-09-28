const obj = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'popup__error_active'
}

function enableValidation(obj) {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            // У каждой формы отменим стандартное поведение
            evt.preventDefault();
        });
        // Для каждой формы вызовем функцию setEventListeners,
        // передав ей элемент формы
        setEventListeners(formElement, obj.inputSelector, obj.submitButtonSelector, obj.inactiveButtonClass, obj.inputErrorClass, obj.errorClass);
        //!!!!!!!!!!изучить реализация rest или ...args, попытка передачи через них не сработала, передал пока вручную!!!!!!!!!!!!!!!!
    });
}

function setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    // Находим кнопку внутри формы
    const saveButton = formElement.querySelector(submitButtonSelector);
    stateButton(inputList, saveButton, inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            // Внутри колбэка вызовем isValid,
            // передав ей форму и проверяемый элемент
            stateButton(inputList, saveButton, inactiveButtonClass);
            isValid(formElement, inputElement, inputSelector, inputErrorClass, errorClass)
        });
    });
}
// Функция isValid теперь принимает formElement и inputElement,
// а не берёт их из внешней области видимости
function isValid(formElement, inputElement, inputSelector, inputErrorClass, errorClass) {
    if (!inputElement.validity.valid) {
        // showInputError теперь получает параметром форму, в которой
        // находится проверяемое поле, и само это поле
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        // hideInputError теперь получает параметром форму, в которой
        // находится проверяемое поле, и само это поле
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
}
// Проверяем что все инпуты валидны
function checkInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return (!inputElement.validity.valid)
    });
}

// В зависимости от валидности импутов мы активируем кнопку или нет
// Реализация кнопки была в теме Урок6 События change & input, возник вопрос, но забыл, пересмотреть тему!!!!!!!!!!!!!!!! (может вспомню)
function stateButton(inputList, saveButton, inactiveButtonClass) {
    if (checkInvalidInput(inputList)) {
        saveButton.classList.add(inactiveButtonClass);
        saveButton.setAttribute('disabled', true);
    } else {
        saveButton.classList.remove(inactiveButtonClass);
        saveButton.removeAttribute('disabled');
    }
}

function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
}


// Вызов функции
enableValidation(obj);
