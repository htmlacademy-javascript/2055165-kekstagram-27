const SCALE_STEP = 25;

const ScaleRange = {
  MIN: '25%',
  MAX: '100%',
};

const SLIDER_OPTIONS = {
  'none': {
    filter: '',
  },
  'chrome': {
    filter: 'grayscale(1)',
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  },
  'sepia': {
    filter: 'sepia(1)',
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  },
  'marvin': {
    filter: 'invert(100%)',
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1
  },
  'phobos': {
    filter: 'blur(3px)',
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1
  },
  'heat': {
    filter: 'brightness(3)',
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: 0.1
  },
};

const EFFECT_VALUE_FORMAT = /\d{1,3}(\.\d)?/;

const uploadImageForm = document.querySelector('.img-upload__form');

const scaleSmallerButton = uploadImageForm.querySelector('.scale__control--smaller');
const scaleBiggerButton = uploadImageForm.querySelector('.scale__control--bigger');
const scaleField = uploadImageForm.querySelector('.scale__control--value');

const image = uploadImageForm.querySelector('.img-upload__preview img');

const sliderEffectField = uploadImageForm.querySelector('.img-upload__effect-level');
const sliderEffect = sliderEffectField.querySelector('.effect-level__slider');
const effectValue = sliderEffectField.querySelector('.effect-level__value');

const effectsList = uploadImageForm.querySelector('.effects__list');

const increaseScale = () => {
  if (scaleField.value !== ScaleRange.MAX) {
    scaleField.value = `${parseInt(scaleField.value, 10) + SCALE_STEP}%`;
    image.style.transform = `scale(${parseInt(scaleField.value, 10) / 100})`;
  }
};

const decreaseScale = () => {
  if (scaleField.value !== ScaleRange.MIN) {
    scaleField.value = `${parseInt(scaleField.value, 10) - SCALE_STEP}%`;
    image.style.transform = `scale(${parseInt(scaleField.value, 10) / 100})`;
  }
};

const hideSliderTool = () => {
  sliderEffectField.classList.add('hidden');
  sliderEffect.setAttribute('disabled', true);
};

const showSliderTool = () => {
  sliderEffectField.classList.remove('hidden');
  sliderEffect.removeAttribute('disabled');
};

const onChangeEffect = (evt) => {
  const filterType = evt.target.closest('input[type="radio"]').value;

  image.className = image.className.replace(/\beffects__preview--\w+\b/, `effects__preview--${filterType}`);

  if (filterType === 'none') {
    hideSliderTool();
    effectValue.value = '';
  } else {
    showSliderTool();
    sliderEffect.noUiSlider.updateOptions(SLIDER_OPTIONS[filterType]);
  }

  image.style.filter = SLIDER_OPTIONS[filterType].filter;
};

const updateEffectValue = (values, handle) => {
  effectValue.value = sliderEffect.hasAttribute('disabled') ? '' : (+values[handle]).toFixed(1);
  image.style.filter = image.style.filter.replace(EFFECT_VALUE_FORMAT, effectValue.value);
};

const loadFiltersOptions = () => {
  scaleField.value = ScaleRange.MAX;
  scaleBiggerButton.addEventListener('click', increaseScale);
  scaleSmallerButton.addEventListener('click', decreaseScale);

  image.classList.add('effects__preview--none');

  noUiSlider.create(sliderEffect, {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 1,
    connect: 'lower',
  });
  hideSliderTool();

  image.style.filter = SLIDER_OPTIONS['none'];

  effectsList.addEventListener('change', onChangeEffect);
  sliderEffect.noUiSlider.on('update', updateEffectValue);
};

const resetFilterOptions = () => {
  scaleField.value = ScaleRange.MAX;
  scaleBiggerButton.removeEventListener('click', increaseScale);
  scaleSmallerButton.removeEventListener('click', decreaseScale);
  effectsList.removeEventListener('change', onChangeEffect);

  image.className = image.className.replace(/\beffects__preview--\w+\b/, '');
  effectValue.value = '';

  sliderEffect.noUiSlider.destroy();
  image.removeAttribute('style');
};

export { loadFiltersOptions, resetFilterOptions };
