const pictureElement = document.querySelector('.big-picture');

const pictureImage = pictureElement.querySelector('.big-picture__img img');
const likesCount = pictureElement.querySelector('.likes-count');

const commentsCount = pictureElement.querySelector('.comments-count');
const commentsList = pictureElement.querySelector('.social__comments');
const commentItemTemplate = commentsList.querySelector('.social__comment');

const pictureDescription = pictureElement.querySelector('.social__caption');
const commentsCounter = pictureElement.querySelector('.social__comment-count');
const commentsLoader = pictureElement.querySelector('.comments-loader');

const closePicPreviewButton = pictureElement.querySelector('.big-picture__cancel');


const openPicturePreview = (pictureObject) => {
  pictureImage.src = pictureObject.url;
  likesCount.textContent = pictureObject.likes;
  commentsCount.textContent = pictureObject.comments.length;
  pictureDescription.textContent = pictureObject.description;

  commentsList.innerHTML = '';
  const commentsListFragment = document.createDocumentFragment();

  for (let i = 0; i < pictureObject.comments.length; i++) {
    const comment = pictureObject.comments[i];
    const newCommentItem = commentItemTemplate.cloneNode(true);

    newCommentItem.querySelector('img').src = comment.avatar;
    newCommentItem.querySelector('img').alt = comment.name;
    newCommentItem.querySelector('.social__text').textContent = comment.message;

    commentsListFragment.append(newCommentItem);
  }

  commentsList.append(commentsListFragment);

  document.body.classList.add('modal-open');
  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  pictureElement.classList.remove('hidden');
};

closePicPreviewButton.addEventListener('click', () => {
  document.body.classList.remove('modal-open');
  pictureElement.classList.add('hidden');
});

document.addEventListener('keydown', (evt) => {
  if (evt.code === 'Escape') {
    document.body.classList.remove('modal-open');
    pictureElement.classList.add('hidden');
  }
});

export {openPicturePreview};
