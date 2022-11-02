import { isEscapeKey } from './utils.js';

const picturePreviewElement = document.querySelector('.big-picture');

const closePicPreviewButton = document.querySelector('.big-picture__cancel');


const pictureImage = picturePreviewElement.querySelector('.big-picture__img img');
const likesCount = picturePreviewElement.querySelector('.likes-count');

const commentsCount = picturePreviewElement.querySelector('.comments-count');
const commentsList = picturePreviewElement.querySelector('.social__comments');
const commentItemTemplate = commentsList.querySelector('.social__comment');

const pictureDescription = picturePreviewElement.querySelector('.social__caption');
const commentsCounter = picturePreviewElement.querySelector('.social__comment-count');
const commentsLoader = picturePreviewElement.querySelector('.comments-loader');

const clearPictureCommentsData = () => {
  commentsList.innerHTML = '';
};

const onPreviewEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePicturePreview();
  }
};

const createCommentItem = ({ avatar, name, message }) => {
  const newCommentItem = commentItemTemplate.cloneNode(true);

  newCommentItem.querySelector('img').src = avatar;
  newCommentItem.querySelector('img').alt = name;
  newCommentItem.querySelector('.social__text').textContent = message;
  return newCommentItem;
};

function openPicturePreview({ url, likes, comments, description }) {
  document.body.classList.add('modal-open');
  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  picturePreviewElement.classList.remove('hidden');

  pictureImage.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  pictureDescription.textContent = description;

  clearPictureCommentsData();
  const commentsListFragment = document.createDocumentFragment();

  for (let i = 0; i < comments.length; i++) {
    const newCommentItem = createCommentItem(comments[i]);
    commentsListFragment.append(newCommentItem);
  }

  commentsList.append(commentsListFragment);

  closePicPreviewButton.addEventListener('click', closePicturePreview);
  document.addEventListener('keydown', onPreviewEscKeydown);
}

function closePicturePreview() {
  document.body.classList.remove('modal-open');
  picturePreviewElement.classList.add('hidden');
  clearPictureCommentsData();

  closePicPreviewButton.addEventListener('click', closePicturePreview);
  document.removeEventListener('keydown', onPreviewEscKeydown);
}

export { openPicturePreview, closePicturePreview };
