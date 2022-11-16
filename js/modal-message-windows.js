import { isEscapeKey } from './utils.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const dataErrorMessageTemplate = document.querySelector('#data-error').content.querySelector('.error');

function showMessageWindow(typeMessage) {
  let messageWindowElement;

  if (typeMessage === 'success-upload-form') {
    messageWindowElement = successMessageTemplate.cloneNode(true);
  } else if (typeMessage === 'error-upload-form') {
    messageWindowElement = errorMessageTemplate.cloneNode(true);
  } else if (typeMessage === 'load-data-error') {
    messageWindowElement = dataErrorMessageTemplate.cloneNode(true);
  }

  const closeMessageButton = messageWindowElement.querySelector('button');

  closeMessageButton.addEventListener('click', hideMessageWindow);
  document.addEventListener('click', onWindowMessageClick);
  document.addEventListener('keydown', onWindowMessageEscKeyDown, {capture: true});

  document.body.insertAdjacentElement('beforeend', messageWindowElement);
}

function hideMessageWindow() {
  const messageWindowElement = (document.querySelector('section.error') || document.querySelector('section.data-error') || document.querySelector('section.success'));
  messageWindowElement.remove();
  const closeMessageButton = messageWindowElement.querySelector('button');

  closeMessageButton.removeEventListener('click', hideMessageWindow);
  document.removeEventListener('click', onWindowMessageClick);
  document.removeEventListener('keydown', onWindowMessageEscKeyDown, {capture: true});
}

function onWindowMessageClick(evt) {
  const messageWindowElement = (document.querySelector('section.error') || document.querySelector('section.data-error') || document.querySelector('section.success'));
  if (evt.target === messageWindowElement) {
    hideMessageWindow();
  }
}

function onWindowMessageEscKeyDown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    hideMessageWindow();
  }
}

export { showMessageWindow };
