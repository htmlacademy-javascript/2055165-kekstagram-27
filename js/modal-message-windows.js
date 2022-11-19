import { isEscapeKey } from './utils.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const dataErrorMessageTemplate = document.querySelector('#data-error').content.querySelector('.error');
const formatErrorMessageTemplate = document.querySelector('#format-error').content.querySelector('.error');

const onWindowMessageEscKeyDown = (evt) => {
  evt.preventDefault();
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    hideMessageWindow();
  }
};

const findWindowMessageElement = () => {
  const messageWindowElement = (
    document.querySelector('section.error') ||
    document.querySelector('section.data-error') ||
    document.querySelector('section.format-error') ||
    document.querySelector('section.success')
  );

  return messageWindowElement;
};

const onWindowMessageClick = (evt) => {
  const messageWindowElement = findWindowMessageElement();

  if (evt.target === messageWindowElement) {
    hideMessageWindow();
  }
};

function showMessageWindow(typeMessage) {
  let messageWindowElement;

  if (typeMessage === 'success-upload-form') {
    messageWindowElement = successMessageTemplate.cloneNode(true);
  } else if (typeMessage === 'error-upload-form') {
    messageWindowElement = errorMessageTemplate.cloneNode(true);
  } else if (typeMessage === 'load-data-error') {
    messageWindowElement = dataErrorMessageTemplate.cloneNode(true);
  } else if (typeMessage === 'error-image-format') {
    messageWindowElement = formatErrorMessageTemplate.cloneNode(true);
  }

  const closeMessageButton = messageWindowElement.querySelector('button');

  closeMessageButton.addEventListener('click', hideMessageWindow);
  document.addEventListener('click', onWindowMessageClick);
  document.addEventListener('keydown', onWindowMessageEscKeyDown, {capture: true});

  document.body.insertAdjacentElement('beforeend', messageWindowElement);
}

function hideMessageWindow() {
  const messageWindowElement = findWindowMessageElement();

  messageWindowElement.remove();
  const closeMessageButton = messageWindowElement.querySelector('button');

  closeMessageButton.removeEventListener('click', hideMessageWindow);
  document.removeEventListener('click', onWindowMessageClick);
  document.removeEventListener('keydown', onWindowMessageEscKeyDown, {capture: true});
}

export { showMessageWindow };
