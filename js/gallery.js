import { renderPhotoGallery } from './thumbnails.js';
import { openPicturePreview } from './big-picture-preview.js';
import { getData } from './data-server-exchange.js';
import {openDataErrorMessage} from './modal-message-windows.js';

const picturesGallery = document.querySelector('.pictures');

let photoObjArray;

getData((photoObjects) => {
  photoObjArray = photoObjects;
  renderPhotoGallery(photoObjects);
},
() => {
  openDataErrorMessage();
});


const getPhotoObjById = (id) => photoObjArray.find((photoObj) => photoObj.id === id);

const onClickThumbnail = (evt) => {
  const thumbnailPicObj = evt.target.closest('a.picture');
  if (thumbnailPicObj) {
    evt.preventDefault();
    const photoObj = getPhotoObjById(+thumbnailPicObj.dataset.id);
    openPicturePreview(photoObj);
  }
};

picturesGallery.addEventListener('click', onClickThumbnail);
