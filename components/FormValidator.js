export class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._settings = settings;
        this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        this._submitButton = this._form.querySelector(this._settings.submitButtonSelector);
    }

    /*Показать строку с ошибкой*/
    _showError(inputErrorArea, inputElement) {
        inputErrorArea.classList.add(this._settings.errorVisibleClass);
        inputErrorArea.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._settings.inputErrorClass);
    }

    /*Спрятать строку с ошибкой*/
    _hideError(inputErrorArea, inputElement) {
        inputErrorArea.classList.remove(this._settings.errorVisibleClass);
        inputErrorArea.textContent = '';
        inputElement.classList.remove(this._settings.inputErrorClass);
    }

    /*Отключить кнопку отправки формы*/
    _disableSubmitButton() {
        this._submitButton.classList.add(this._settings.inactiveButtonClass);
        this._submitButton.setAttribute("disabled", "disabled");
    }

    /*Активировать кнопку отправки формы*/
    _enableSubmitButton() {
        this._submitButton.classList.remove(this._settings.inactiveButtonClass);
        this._submitButton.removeAttribute("disabled");
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
    toggleButtonState() {
        if (this._form.checkValidity()) {
            this._enableSubmitButton();
        } else {
            this._disableSubmitButton();
        }
    }

    /*Валидация всех инпутов*/
    _inputValidation() {
        this._inputList.forEach((inputElement) => {
            const inputErrorArea = this._form.querySelector(`.error-${inputElement.name}`);
            inputElement.addEventListener('input', () => {
                this._toggleErrorVisibility(inputElement, inputErrorArea);
                this.toggleButtonState();
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
    resetForm() {
        const errors = this._form.querySelectorAll(this._settings.errorSelector);
        this._form.reset();
        this._inputList.forEach((input) => {
            const error = this._form.querySelector(`.error-${input.name}`);
            this._hideError(error, input);
          }); 

        if (!this._submitButton.classList.contains(this._settings.inactiveButtonClass)) {
            this._disableSubmitButton();
        }
    }


    enableValidation() {
        this._preventDefaultSubmit();
        this._inputValidation();
        this.toggleButtonState();
    }
}
