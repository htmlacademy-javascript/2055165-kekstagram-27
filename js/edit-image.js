const SCALE_STEP = 25;

const EFFECTS_FILTERS = {
  'none': '',
  'chrome': 'grayscale(1)',
  'sepia': 'sepia(1)',
  'marvin': 'invert(100%)',
  'phobos': 'blur(3px)',
  'heat': 'brightness(3)'
};

const SLIDER_OPTIONS = {
  'chrome': {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  },
  'sepia': {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  },
  'marvin': {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1
  },
  'phobos': {
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1
  },
  'heat': {
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: 0.1
  },
};

const uploadImageForm = document.querySelector('.img-upload__form');

const scaleSmallerButton = uploadImageForm.querySelector('.scale__control--smaller');
const scaleBiggerButton = uploadImageForm.querySelector('.scale__control--bigger');
const scaleField = uploadImageForm.querySelector('.scale__control--value');

const image = uploadImageForm.querySelector('.img-upload__preview img');

const sliderEffectElement = uploadImageForm.querySelector('.effect-level__slider');

const effectsList = uploadImageForm.querySelector('.effects__list');

function increaseScale() {
  if (scaleField.value !== '100%') {
    scaleField.value = `${Number(scaleField.value.replace('%','')) + SCALE_STEP}%`;
    image.style.transform = `scale(${Number(scaleField.value.replace('%','')) / 100})`;
  }
}

function decreaseScale() {
  if (scaleField.value !== '25%') {
    scaleField.value = `${Number(scaleField.value.replace('%','')) - SCALE_STEP}%`;
    image.style.transform = `scale(${Number(scaleField.value.replace('%','')) / 100})`;
  }
}

noUiSlider.create(sliderEffectElement, {
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

sliderEffectElement.classList.add('hidden');

scaleField.value = '100%';
scaleBiggerButton.addEventListener('click', increaseScale);
scaleSmallerButton.addEventListener('click', decreaseScale);

effectsList.addEventListener('change', (evt) => {
  const effectType = evt.target.closest('input[type="radio"]');

  if (image.className.includes('effects__preview--')) {
    image.className = image.className.replace(/\beffects__preview--\w+\b/, `effects__preview--${effectType.value}`);
  } else {
    image.classList.add(`effects__preview--${effectType.value}`);
  }

  image.style.filter = EFFECTS_FILTERS[effectType.value];
});

