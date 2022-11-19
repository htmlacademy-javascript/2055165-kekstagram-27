import { renderPhotoGallery } from './thumbnails.js';
import { openPicturePreview } from './big-picture-preview.js';
import { getData } from './data-server-exchange.js';
import { showMessageWindow } from './modal-message-windows.js';
import { showFilterOptions, onDefaultFilterClick, onRandomFilterClick, onDiscussedFilterClick, getRandomFilterPhotos, getSortedByCommentPhotos } from './gallery-filter.js';
import { debounce } from './utils.js';

const UPDATE_GALLERY_DELAY = 500;

const picturesGallery = document.querySelector('.pictures');

let cachePhotos;

const getPhotoObjById = (id) => cachePhotos.find((photoObj) => photoObj.id === id);

const onClickThumbnail = (evt) => {
  const thumbnailPicObj = evt.target.closest('a.picture');
  if (thumbnailPicObj) {
    evt.preventDefault();
    const photoObj = getPhotoObjById(+thumbnailPicObj.dataset.id);
    openPicturePreview(photoObj);
  }
};

picturesGallery.addEventListener('click', onClickThumbnail);

getData((photoObjects) => {
  cachePhotos = photoObjects;

  renderPhotoGallery(photoObjects);
  showFilterOptions();

  onDefaultFilterClick(debounce(() => renderPhotoGallery(photoObjects), UPDATE_GALLERY_DELAY));
  onRandomFilterClick(debounce(() => {
    const randomPhotoObjects = getRandomFilterPhotos(photoObjects);
    renderPhotoGallery(randomPhotoObjects);
  }), UPDATE_GALLERY_DELAY);
  onDiscussedFilterClick(debounce(() => {
    const sortedByCommentPhotoObjects = getSortedByCommentPhotos(photoObjects);
    renderPhotoGallery(sortedByCommentPhotoObjects);
  }), UPDATE_GALLERY_DELAY);
},
() => {
  showMessageWindow('load-data-error');
});
