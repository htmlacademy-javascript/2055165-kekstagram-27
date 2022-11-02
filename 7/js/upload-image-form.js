import { isEscapeKey } from './utils.js';

//Константы для валидации полей
const HASHTAG_MAXLENGTH = 20;
const HASHTAG_MAXCOUNT = 5;
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const uploadImageForm = document.querySelector('.img-upload__form');
const uploadImageOverlay = uploadImageForm.querySelector('.img-upload__overlay');
const closeUploadFormButton = uploadImageForm.querySelector('.img-upload__cancel');

const uploadImageField = uploadImageForm.querySelector('#upload-file');
const uploadImageHashtags = uploadImageForm.querySelector('.text__hashtags');
const uploadImageDescription = uploadImageForm.querySelector('.text__description');

const submitFormButton = uploadImageForm.querySelector('.img-upload__submit');
const formTextFields = uploadImageForm.querySelector('.img-upload__text');

const pristine = new Pristine(uploadImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field--invalid',
  successClass: 'img-upload__field--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'form__error'
});

pristine.addValidator(uploadImageHashtags, validateHashtagsName, hashtagsNameErrorMsg, 3);
pristine.addValidator(uploadImageHashtags, validateHashtagsCount, hashtagsCountErrorMsg, 2);
pristine.addValidator(uploadImageHashtags, validateHashtagsDuplicate, hashtagsDuplicateErrorMsg, 1);

const onUploadFormEscKeydown = (evt) => {
  if (!(document.activeElement === uploadImageDescription || document.activeElement === uploadImageHashtags) && isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadImageForm();
  }
};

function openUploadImageForm() {
  document.body.classList.add('modal-open');
  uploadImageOverlay.classList.remove('hidden');

  formTextFields.addEventListener('input', toggleSubmitFormButton);
  closeUploadFormButton.addEventListener('click', closeUploadImageForm);
  uploadImageForm.addEventListener('submit', onFormSubmit);
  document.addEventListener('keydown', onUploadFormEscKeydown);
}

function closeUploadImageForm() {
  document.body.classList.remove('modal-open');
  uploadImageOverlay.classList.add('hidden');

  uploadImageForm.reset();
  pristine.reset();

  formTextFields.removeEventListener('input', toggleSubmitFormButton);
  closeUploadFormButton.removeEventListener('click', closeUploadImageForm);
  uploadImageForm.removeEventListener('submit', onFormSubmit);
  document.removeEventListener('keydown', onUploadFormEscKeydown);
}

function optimizeHashtagString(srcString) {
  return srcString.toLowerCase().replace(/\s+/g, ' ').trim();
}

function validateHashtagsName(hashtagsString) {
  if (hashtagsString.trim() !== '') {
    hashtagsString = optimizeHashtagString(hashtagsString);
    const hashtags = hashtagsString.split(' ');
    return hashtags.every((hashtag) => HASHTAG_PATTERN.test(hashtag));
  }
  return true;
}

function hashtagsNameErrorMsg() {
  return `Проверьте хэштеги. Каждый хэштег должен начинаться с 'решетки' (#), иметь длину не более ${HASHTAG_MAXLENGTH} символов и не должен содержать спецсимволов`;
}

function validateHashtagsCount(hashtagsString) {
  if (hashtagsString.trim() !== '') {
    hashtagsString = optimizeHashtagString(hashtagsString);
    return hashtagsString.split(' ').length <= HASHTAG_MAXCOUNT;
  }
  return true;
}

function hashtagsCountErrorMsg() {
  return `Максимальное число хэштегов не должно превышать ${HASHTAG_MAXCOUNT}`;
}

function validateHashtagsDuplicate(hashtagsString) {
  if (hashtagsString.trim() !== '') {
    hashtagsString = optimizeHashtagString(hashtagsString);
    const hashtags = hashtagsString.split(' ');
    return hashtags.length === new Set(hashtags).size;
  }
  return true;
}

function hashtagsDuplicateErrorMsg() {
  return 'Не должно быть одинаковых хэштегов';
}

function toggleSubmitFormButton(evt) {
  if (evt.target.closest('div.img-upload__field-wrapper')) {
    submitFormButton.disabled = !pristine.validate();
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();
  if (pristine.validate()) {
    uploadImageHashtags.value = optimizeHashtagString(uploadImageHashtags.value);
    uploadImageForm.submit();
    closeUploadImageForm();
  }
}

uploadImageField.addEventListener('change', openUploadImageForm);
