

/*Активировать кнопку отправки формы*/
function enableSubmitButton({inactiveButtonClass}, submitButton) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.removeAttribute("disabled");
}

/*Отключить кнопку отправки формы*/
function disableSubmitButton({inactiveButtonClass}, submitButton) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.setAttribute("disabled", "disabled");
}

/*Показать строку с ошибкой*/
function showError({errorClass, inputErrorClass}, inputErrorArea, inputElement) {
    inputErrorArea.classList.add(errorClass);
    inputErrorArea.textContent = inputElement.validationMessage;
    inputElement.classList.add(inputErrorClass);
}

/*Спрятать строку с ошибкой*/
function hideError({errorClass, inputErrorClass}, inputErrorArea, inputElement) {
    inputErrorArea.classList.remove(errorClass);
    inputErrorArea.textContent = '';
    inputElement.classList.remove(inputErrorClass);
}

/*Показать/скрыть поле с ошибкой*/
function toggleErrorVisibility(rest, inputElement, inputErrorArea) {
    if (!inputElement.validity.valid) {
        showError(rest, inputErrorArea, inputElement);
    } else {
        hideError(rest, inputErrorArea, inputElement);
    }
}

/* Вкл/выкл кнопку Submit */
function toggleButtonState(rest, formElement, submitButton) {
    if (formElement.checkValidity()) {
        enableSubmitButton(rest, submitButton);
    } else {
        disableSubmitButton(rest, submitButton);
    }
}

/*Валидация всех инпутов*/
function inputValidation(rest, formElement, inputElements, submitButton) {
    inputElements.forEach((inputElement) => {
        const inputErrorArea = formElement.querySelector(`.error-${inputElement.name}`);
        inputElement.addEventListener('input', function() {
            toggleErrorVisibility(rest, inputElement, inputErrorArea);
            toggleButtonState(rest, formElement, submitButton);
        });
    });
}

/*Валидация всех форм*/
function enableValidation({ formSelector, inputSelector, submitButtonSelector, ...rest }) {
    const formElements = document.querySelectorAll(formSelector);
    formElements.forEach((formElement) => {
        const inputElements = formElement.querySelectorAll(inputSelector);
        const submitButton = formElement.querySelector(submitButtonSelector);
        inputValidation(rest, formElement, inputElements, submitButton);
    });
}


enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
  }); 
