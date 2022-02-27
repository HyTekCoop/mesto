export class FormValidator {
    constructor(data, formType) {
        this.formSelector = formType;
        this.inputSelector = data.inputSelector;
        this.submitButtonSelector = data.submitButtonSelector;
        this.inactiveButtonClass = data.inactiveButtonClass;
        this.inputErrorClass = data.inputErrorClass;
        this.errorClass = data.errorClass;
    }

    enableValidation() {
        this.formSelector.addEventListener('submit', (evt) => {
            // отменим стандартное поведение
            evt.preventDefault();
        });
        // Для формы вызовем функцию setEventListeners,
        // передав ей элемент формы
        this._setEventListeners(this.formSelector, this.inputSelector, this.submitButtonSelector, this.inactiveButtonClass, this.inputErrorClass, this.errorClass);
    }

    _setEventListeners(formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
        // Находим все поля внутри формы,
        // сделаем из них массив методом Array.from
        const inputList = Array.from(formSelector.querySelectorAll(inputSelector));
        // Находим кнопку внутри формы
        const saveButton = formSelector.querySelector(submitButtonSelector);
        this._stateButton(inputList, saveButton, inactiveButtonClass);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                // Внутри колбэка вызовем isValid,
                // передав ей форму и проверяемый элемент
                this._isValid(formSelector, inputElement, inputSelector, inputErrorClass, errorClass);
                this._stateButton(inputList, saveButton, inactiveButtonClass);
            });
        });
    }

    _isValid(formSelector, inputElement, inputSelector, inputErrorClass, errorClass) {
        if (!inputElement.validity.valid) {
            // showInputError теперь получает параметром форму, в которой
            // находится проверяемое поле, и само это поле
            this._showInputError(formSelector, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
        } else {
            // hideInputError теперь получает параметром форму, в которой
            // находится проверяемое поле, и само это поле
            this._hideInputError(formSelector, inputElement, inputErrorClass, errorClass);
        }
    }

    // Проверяем что все инпуты валидны
    _checkInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return (!inputElement.validity.valid)
        });
    }

    // В зависимости от валидности иyпутов мы активируем кнопку или нет
    _stateButton(inputList, saveButton, inactiveButtonClass) {
        if (this._checkInvalidInput(inputList)) {
            saveButton.classList.add(inactiveButtonClass);
            saveButton.setAttribute('disabled', true);
        } else {
            saveButton.classList.remove(inactiveButtonClass);
            saveButton.removeAttribute('disabled');
        }
    }

    _showInputError(formSelector, inputElement, errorMessage, inputErrorClass, errorClass) {
        // Находим элемент ошибки внутри самой функции
        const errorElement = formSelector.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(errorClass);
    }

    _hideInputError(formSelector, inputElement, inputErrorClass, errorClass) {
        // Находим элемент ошибки
        const errorElement = formSelector.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorClass);
        errorElement.textContent = "";
    }

}



