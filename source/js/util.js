const ALLERT_SHOW_TIME = 5000;

const CancelKeys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min < 0 || max < 0){
    return -1;
  }

  if (min > max){
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkLength = (message, length) => {
  return message.length <= length;
};

const getUniqueNumbers = (min, max, items) => {
  let numbersList = [];

  while (numbersList.length < items) {
    let number = getRandomNumber(min, max);
    if (numbersList.indexOf(number) === -1) {
      numbersList.push(number);
    }
  }
  return numbersList;
};

const isEscapePushed = (evt) => evt.key === CancelKeys.ESC || evt.key === CancelKeys.ESCAPE;

const showConnectionError = (message) => {
  const error = document.createElement('div');
  error.textContent = message;
  error.style.zIndex = 10;
  error.style.position = 'absolute';
  error.style.top = 0;
  error.style.left = 0;
  error.style.right = 0;
  error.style.padding = '10px 30px';
  error.style.font = 'inherit';
  error.style.textAlign = 'center';
  error.style.backgroundColor = 'red';

  document.body.append(error);

  setTimeout(() => {
    error.remove();
  }, ALLERT_SHOW_TIME);
};

const showAlert = (name) => {
  const alertTemplate = document.querySelector(`#${name}`).content.querySelector(`.${name}`);
  const alert = alertTemplate.cloneNode(true);
  document.body.append(alert);
  const alertButton = alert.querySelector(`.${name}__button`);
  alertButton.addEventListener('click', () => {
    alert.remove();
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscapePushed(evt)) {
      alert.remove();
    }
  });

  const OuterClickHandler = (evt) => {
    if (evt.target !== alert.querySelector(`.${name}__inner`) && evt.target !== alert.querySelector(`.${name}__inner > *`)) {
      alert.remove();
      document.body.removeEventListener('click', OuterClickHandler);
    }
  }

  document.body.addEventListener('click', OuterClickHandler);
}

export { getRandomNumber, checkLength, getUniqueNumbers, isEscapePushed, showConnectionError, showAlert };
