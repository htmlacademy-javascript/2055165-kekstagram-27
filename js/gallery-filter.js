import { getUniqRandElementsFromArr } from './utils.js';

const RANDOM_FILTER_PHOTOS_COUNT = 10;

const filterMenu = document.querySelector('.img-filters');

const defaultFilterButton = filterMenu.querySelector('#filter-default');
const randomFilterButton = filterMenu.querySelector('#filter-random');
const discussedFilterButton = filterMenu.querySelector('#filter-discussed');

const showFilterOptions = () => {
  filterMenu.classList.remove('img-filters--inactive');
};

const getRandomFilterPhotos = (photoObjects) => getUniqRandElementsFromArr(RANDOM_FILTER_PHOTOS_COUNT, photoObjects);

const comparePhotoObjects = (obj1, obj2) => obj2.comments.length - obj1.comments.length;

const getSortedByCommentPhotos = (photoObjects) => photoObjects.slice().sort(comparePhotoObjects);

const onDefaultFilterClick = (callback) => {
  defaultFilterButton.addEventListener('click', (evt) => {
    const prevActiveFilterButton = filterMenu.querySelector('.img-filters__button--active');
    prevActiveFilterButton.classList.remove('img-filters__button--active');
    prevActiveFilterButton.disabled = false;

    evt.target.classList.add('img-filters__button--active');
    evt.target.disabled = true;

    callback();
  });
};

const onRandomFilterClick = (callback) => {
  randomFilterButton.addEventListener('click', (evt) => {
    const prevActiveFilterButton = filterMenu.querySelector('.img-filters__button--active');
    prevActiveFilterButton.classList.remove('img-filters__button--active');
    prevActiveFilterButton.disabled = false;

    evt.target.classList.add('img-filters__button--active');
    evt.target.disabled = true;

    callback();
  });
};

const onDiscussedFilterClick = (callback) => {
  discussedFilterButton.addEventListener('click', (evt) => {
    const prevActiveFilterButton = filterMenu.querySelector('.img-filters__button--active');
    prevActiveFilterButton.classList.remove('img-filters__button--active');
    prevActiveFilterButton.disabled = false;

    evt.target.classList.add('img-filters__button--active');
    evt.target.disabled = true;

    callback();
  });
};

export { showFilterOptions, onDefaultFilterClick, onRandomFilterClick, onDiscussedFilterClick, getRandomFilterPhotos, getSortedByCommentPhotos };
