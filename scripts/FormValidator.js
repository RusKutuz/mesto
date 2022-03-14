export class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._settings = settings;
    }

    /*Показать строку с ошибкой*/
    _showError(inputErrorArea, inputElement) {
        inputErrorArea.classList.add(this._settings.errorClass);
        inputErrorArea.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._settings.inputErrorClass);
    }

    /*Спрятать строку с ошибкой*/
    _hideError(inputErrorArea, inputElement) {
        inputErrorArea.classList.remove(this._settings.errorClass);
        inputErrorArea.textContent = '';
        inputElement.classList.remove(this._settings.inputErrorClass);
    }

    /*Отключить кнопку отправки формы*/
    _disableSubmitButton(submitButton) {
        submitButton.classList.add(this._settings.inactiveButtonClass);
        submitButton.setAttribute("disabled", "disabled");
    }

    /*Активировать кнопку отправки формы*/
    _enableSubmitButton(submitButton) {
        submitButton.classList.remove(this._settings.inactiveButtonClass);
        submitButton.removeAttribute("disabled");
    }

    /*Показать/скрыть поле с ошибкой*/
    _toggleErrorVisibility(inputElement, inputErrorArea) {
        if (!inputElement.validity.valid) {
            this._showError(inputErrorArea, inputElement);
        } else {
            this._hideError(inputErrorArea, inputElement);
        }
    }

    /* Вкл/выкл кнопку Submit */
    toggleButtonState(submitButton) {
        if (this._form.checkValidity()) {
            this._enableSubmitButton(submitButton);
        } else {
            this._disableSubmitButton(submitButton);
        }
    }

    /*Валидация всех инпутов*/
    _inputValidation(inputElements, submitButton) {
        inputElements.forEach((inputElement) => {
            const inputErrorArea = this._form.querySelector(`.error-${inputElement.name}`);
            inputElement.addEventListener('input', () => {
                this._toggleErrorVisibility(inputElement, inputErrorArea);
                this.toggleButtonState(submitButton);
            });
        });
    }

    /*Отключить стандартный обработчик submit*/
    _preventDefaultSubmit() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
    }

    
    /* очистить форму */
    resetPopupForm() {
        const inputs = this._form.querySelectorAll('.popup__input');
        const errors = this._form.querySelectorAll('.popup__input-error');
        const submitButton = this._form.querySelector('.popup__submit-button');
        this._form.reset();
        errors.forEach(error => error.textContent = "");
        inputs.forEach(input => {
            if (input.classList.contains('popup__input_type_error')) {
                input.classList.remove('popup__input_type_error');
            }
        });
        if (!submitButton.classList.contains('popup__submit-button_disabled')) {
            submitButton.classList.add('popup__submit-button_disabled');
        }
    }
    

    enableValidation() {
        this._preventDefaultSubmit();
        const inputElements = this._form.querySelectorAll(this._settings.inputSelector);
        const submitButton = this._form.querySelector(this._settings.submitButtonSelector);
        this._inputValidation(inputElements, submitButton);
        this.toggleButtonState(submitButton);
    }
}
