import { renderPhotoGallery } from './thumbnails.js';
import { openPicturePreview } from './big-picture-preview.js';
import { createPhotoMocksArray } from './photo-mocks.js';

const picturesGallery = document.querySelector('.pictures');

const photoMocks = createPhotoMocksArray();

renderPhotoGallery(photoMocks);

const getPhotoObjById = (id) => photoMocks.find((photoObj) => photoObj.id === id);

const onClickThumbnail = (evt) => {
  const thumbnailPicObj = evt.target.closest('a.picture');
  if (thumbnailPicObj){
    evt.preventDefault();
    const photoObj = getPhotoObjById(+thumbnailPicObj.dataset.id);
    openPicturePreview(photoObj);
  }
};

picturesGallery.addEventListener('click', onClickThumbnail);
