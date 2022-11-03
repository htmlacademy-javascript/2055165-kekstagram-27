
const picsGalleryElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPhotoGallery = (photoObjects) => {
  const picturesGalleryFragment = document.createDocumentFragment();

  photoObjects.forEach(({ id, url, likes, comments }) => {
    const thumbnailPicture = pictureTemplate.cloneNode(true);

    thumbnailPicture.dataset.id = id;
    thumbnailPicture.querySelector('.picture__img').src = url;
    thumbnailPicture.querySelector('.picture__likes').textContent = likes;
    thumbnailPicture.querySelector('.picture__comments').textContent = comments.length;

    picturesGalleryFragment.append(thumbnailPicture);
  });

  picsGalleryElement.append(picturesGalleryFragment);
};

export { renderPhotoGallery };
