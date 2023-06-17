const Rates = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
}

const scaleControl = document.querySelector('.img-upload__scale');
const biggerButton = scaleControl.querySelector('.scale__control--bigger');
const smallerButton = scaleControl.querySelector('.scale__control--smaller');
const scaleValue = scaleControl.querySelector('.scale__control--value');
const userImage = document.querySelector('.img-upload__preview img');

const assignScale = (value) => {
  userImage.style.transform = `scale(${value})`;
}

const enlargeImage = () => {
  if (parseInt(scaleValue.value) < Rates.MAX) {
    scaleValue.value = parseInt(scaleValue.value) + Rates.STEP + '%';
    assignScale(scaleValue.value);
  }
};

const downsizeImage = () => {
  if (parseInt(scaleValue.value) > Rates.MIN) {
    scaleValue.value = parseInt(scaleValue.value) - Rates.STEP + '%';
    assignScale(scaleValue.value);
  }
};

const scaleImage = () => {
  scaleValue.value = '100%';

  biggerButton.addEventListener('click', enlargeImage);
  smallerButton.addEventListener('click', downsizeImage);
}

const scaleImageReset = () => {
  userImage.style.transform = '';

  biggerButton.removeEventListener('click', enlargeImage);
  smallerButton.removeEventListener('click', downsizeImage);
}

export { scaleImage, scaleImageReset };
