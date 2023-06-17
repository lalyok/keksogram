import { putCardsInContainer } from './miniature.js';
import { openUploadWindow, closeUploadWindow } from './image-upload.js'
import { showAlert } from './util.js';
import { getData, sendData } from './api.js';
import { showFilter, removeCards } from './filter.js';
import _ from 'lodash';

const RENDER_DELAY = 500;

const uploadInput = document.querySelector('#upload-file');
const form = document.querySelector('#upload-select-image');
const picturesContainer = document.querySelector('.pictures');

getData((cards) => {
  let miniaturesContainer = document.createDocumentFragment();
  putCardsInContainer(cards, picturesContainer, miniaturesContainer);
  showFilter(cards, miniaturesContainer, _.debounce(
    () => {
      removeCards(picturesContainer);
      picturesContainer.appendChild(miniaturesContainer);
    },
    RENDER_DELAY,
  ));
});

uploadInput.addEventListener('change', openUploadWindow);

sendData(
  form,
  () => {
    closeUploadWindow();
    showAlert('success');
  },
  () => {
    closeUploadWindow();
    showAlert('error');
  },
);
