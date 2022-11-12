import { isEscapeKey } from './utils.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessageElement = successMessageTemplate.cloneNode(true);
const closeSuccessButton = successMessageElement.querySelector('.success__button');

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessageElement = errorMessageTemplate.cloneNode(true);
const closeErrorButton = errorMessageElement.querySelector('.error__button');

const dataErrorMessageTemplate = document.querySelector('#data-error').content.querySelector('.error');
const dataErrorMessageElement = dataErrorMessageTemplate.cloneNode(true);
const closeDataErrorButton = dataErrorMessageElement.querySelector('.error__button');


function openSuccessMessage() {
  closeSuccessButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  document.addEventListener('click', onSuccessMessageClick);

  document.body.insertAdjacentElement('beforeend', successMessageElement);
}

function closeSuccessMessage() {
  successMessageElement.remove();

  closeSuccessButton.removeEventListener('click', closeSuccessMessage);
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  document.removeEventListener('click', onSuccessMessageClick);
}

function onSuccessMessageEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
}

function onSuccessMessageClick(evt) {
  if (evt.target === successMessageElement) {
    closeSuccessMessage();
  }
}

function openErrorMessage() {
  closeErrorButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('click', onErrorMessageClick);
  document.addEventListener('keydown', onErrorMessageEscKeyDown, { capture: true });

  document.body.insertAdjacentElement('beforeend', errorMessageElement);
}

function closeErrorMessage() {
  errorMessageElement.remove();

  closeErrorButton.removeEventListener('click', closeErrorMessage);
  document.removeEventListener('click', onErrorMessageClick);
  document.removeEventListener('keydown', onErrorMessageEscKeyDown, { capture: true });
}

function onErrorMessageClick(evt) {
  if (evt.target === errorMessageElement) {
    closeErrorMessage();
  }
}

function onErrorMessageEscKeyDown(evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    closeErrorMessage();
  }
}

function openDataErrorMessage() {
  document.body.insertAdjacentElement('beforeend', dataErrorMessageElement);

  closeDataErrorButton.addEventListener('click', closeDataErrorMessage);
  document.addEventListener('click', onDataErrorMessageClick);
  document.addEventListener('keydown', onDataErrorMessageEscKeyDown);
}

function closeDataErrorMessage() {
  dataErrorMessageElement.remove();

  closeDataErrorButton.removeEventListener('click', closeDataErrorMessage);
  document.removeEventListener('click', onDataErrorMessageClick);
  document.removeEventListener('keydown', onDataErrorMessageEscKeyDown);
}

function onDataErrorMessageClick(evt) {
  if (evt.target === dataErrorMessageElement) {
    closeDataErrorMessage();
  }
}

function onDataErrorMessageEscKeyDown(evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeDataErrorMessage();
  }
}


export { openSuccessMessage, openErrorMessage, openDataErrorMessage };
