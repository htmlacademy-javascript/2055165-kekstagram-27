import { renderPhotoGallery } from './thumbnails.js';
import { openPicturePreview, closePicturePreview } from './big-picture-preview.js';
import { createPhotoMocksArray } from './photo-mocks.js';

const picturesGallery = document.querySelector('.pictures');
const closePicPreviewButton = document.querySelector('.big-picture__cancel');

const photoMocks = createPhotoMocksArray();

renderPhotoGallery(photoMocks);

function getPhotoObjById(id) {
  return photoMocks.find((photoObj) => photoObj.id === id);
}

picturesGallery.addEventListener('click', (evt) => {
  const thumbnailPicObj = evt.target.closest('a.picture');
  if (thumbnailPicObj){
    evt.preventDefault();
    const photoObj = getPhotoObjById(+thumbnailPicObj.dataset.id);
    openPicturePreview(photoObj);
  }
});

closePicPreviewButton.addEventListener('click', () => {
  closePicturePreview();
});
