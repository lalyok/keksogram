import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const effectFieldset = document.querySelector('.effect-level');
const effectValue = effectFieldset.querySelector('.effect-level__value');
const effectSlider = effectFieldset.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const userImage = document.querySelector('.img-upload__preview img');
let currentClass = 'effects__preview--none';

const sliderFormat = {
  to: (value) => {
    if (Number.isInteger(value)) {
      return value.toFixed(0);
    }
    return value.toFixed(1);
  },
  from: (value) => {
    return parseFloat(value);
  },
}

noUiSlider.create(effectSlider, {
  start: 1,
  range: {
    min: 0,
    max: 1,
  },
  step: 0.1,
});

effectFieldset.classList.add('hidden');

const createSlider = (start = 1, min = 0, max = 1, step = 0.1, format = sliderFormat) => {
  effectFieldset.classList.remove('hidden');
  effectSlider.noUiSlider.destroy();

  noUiSlider.create(effectSlider, {
    start: start,
    range: {
      min: min,
      max: max,
    },
    step: step,
    format: format,
  });
}

const addSliderHandler = (effect, round = 1) => {
  effectSlider.noUiSlider.on('update', (values, handle) => {
    effectValue.value = (parseFloat(values[handle])).toFixed(round);
    userImage.style.filter = `${effect}(${values[handle]})`;
  });
}


const onEffectClick = (evt) => {
  if (evt.target.matches('.effects__radio')) {
    userImage.classList.remove(currentClass)
    const effectName = evt.target.value;
    currentClass = `effects__preview--${effectName}`;
    userImage.classList.add(currentClass);

    switch (currentClass) {
      case 'effects__preview--none':
        effectFieldset.classList.add('hidden');
        userImage.style.filter = '';
        break;
      case 'effects__preview--chrome':
        createSlider();
        addSliderHandler('grayscale');
        break;
      case 'effects__preview--sepia':
        createSlider();
        addSliderHandler('sepia');
        break;
      case 'effects__preview--marvin':
        createSlider(
          100,
          0,
          100,
          1,
          {
            to: (value) => value + '%',
            from: (value) => Number(value.replace('%', '')),
          });
        addSliderHandler('invert', 0);
        break;
      case 'effects__preview--phobos':
        createSlider(
          3,
          0,
          3,
          0.1,
          {
            to: (value) => value + 'px',
            from: (value) => Number(value.replace('px', '')),
          });
        addSliderHandler('blur');
        break;
      case 'effects__preview--heat':
        createSlider(
          3,
          1,
          3,
          0.1,
        );
        addSliderHandler('brightness');
        break;
    }
  }
}

const addEffect = () => {
  effectsList.addEventListener('click', onEffectClick);
};

const effectReset = () => {
  effectsList.removeEventListener('click', onEffectClick);
  userImage.classList.remove(currentClass);
  effectFieldset.classList.add('hidden');
  userImage.style.filter = '';
  effectValue.value = '';
};

export { addEffect, effectReset };
