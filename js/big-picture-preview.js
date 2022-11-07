import { isEscapeKey } from './utils.js';

let commentsArray;

const COMMENTS_COUNT_PER_ADDING = 5;

const picturePreviewElement = document.querySelector('.big-picture');

const closePicPreviewButton = document.querySelector('.big-picture__cancel');

const pictureImage = picturePreviewElement.querySelector('.big-picture__img img');
const likesCount = picturePreviewElement.querySelector('.likes-count');
const pictureDescription = picturePreviewElement.querySelector('.social__caption');

const commentsTotalCount = picturePreviewElement.querySelector('.comments-count');
const commentsList = picturePreviewElement.querySelector('.social__comments');

const commentItemTemplate = commentsList.querySelector('.social__comment');

const commentsLoader = picturePreviewElement.querySelector('.comments-loader');
const currentCommentsOnPreview = picturePreviewElement.querySelector('.current-comments__count');

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

function addNewCommentsOnPreview() {
  let lastCurrentCommentNumber = commentsList.children.length;
  const lastNewCommentNumber = commentsArray.length - commentsList.children.length < COMMENTS_COUNT_PER_ADDING ? commentsArray.length : lastCurrentCommentNumber + COMMENTS_COUNT_PER_ADDING;

  const commentsListFragment = document.createDocumentFragment();

  for (lastCurrentCommentNumber; lastCurrentCommentNumber < lastNewCommentNumber; lastCurrentCommentNumber++) {
    const newCommentItem = createCommentItem(commentsArray[lastCurrentCommentNumber]);
    commentsListFragment.append(newCommentItem);
  }

  commentsList.append(commentsListFragment);
  currentCommentsOnPreview.textContent = commentsList.children.length;

  if (lastCurrentCommentNumber === commentsArray.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
}

function openPicturePreview({ url, likes, comments, description }) {
  commentsArray = comments;

  document.body.classList.add('modal-open');
  picturePreviewElement.classList.remove('hidden');

  pictureImage.src = url;
  likesCount.textContent = likes;
  commentsTotalCount.textContent = comments.length;
  pictureDescription.textContent = description;

  clearPictureCommentsData();
  addNewCommentsOnPreview();

  closePicPreviewButton.addEventListener('click', closePicturePreview);
  document.addEventListener('keydown', onPreviewEscKeydown);
  commentsLoader.addEventListener('click', addNewCommentsOnPreview);
}

function closePicturePreview() {
  document.body.classList.remove('modal-open');
  picturePreviewElement.classList.add('hidden');

  clearPictureCommentsData();
  commentsArray = null;

  closePicPreviewButton.addEventListener('click', closePicturePreview);
  document.removeEventListener('keydown', onPreviewEscKeydown);
  commentsLoader.removeEventListener('click', addNewCommentsOnPreview);
}

export { openPicturePreview, closePicturePreview };
