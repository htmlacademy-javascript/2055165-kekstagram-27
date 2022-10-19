import {createPhotoMocksArray} from './photo-mocks.js';

const picsGalleryElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const photoMocks = createPhotoMocksArray();
const picturesGalleryFragment = document.createDocumentFragment();

photoMocks.forEach(({url, likes, comments}) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picturesGalleryFragment.append(picture);
});

picsGalleryElement.append(picturesGalleryFragment);

