import {createPhotoMocksArray} from './photo-mocks.js';
import {openPicturePreview} from './big-picture-preview.js';

const picsGalleryElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const photoMocks = createPhotoMocksArray();
const picturesGalleryFragment = document.createDocumentFragment();

photoMocks.forEach((mock) => {
  const picture = pictureTemplate.cloneNode(true);
  const {url, likes, comments} = mock;

  picture.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPicturePreview(mock);
  });

  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;

  picturesGalleryFragment.append(picture);
});

picsGalleryElement.append(picturesGalleryFragment);


