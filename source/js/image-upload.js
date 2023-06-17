import { isEscapePushed} from './util.js';
import { scaleImage, scaleImageReset } from './image-scale.js';
import { addEffect, effectReset } from './image-effect.js';
import { validateUserText, userTextReset } from './user-text.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const uploadInput = document.querySelector('#upload-file');
const uploadWindow = document.querySelector('.img-upload__overlay');
const uploadCloseButton = uploadWindow.querySelector('#upload-cancel');
const preview = uploadWindow.querySelector('.img-upload__preview img');
const effectsPreview = uploadWindow.querySelectorAll('.effects__preview');

const uploadPicture = () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => {
    return fileName.endsWith(type);
  });

  if (matches) {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.addEventListener('load', () => {
      preview.src = reader.result;
      effectsPreview.forEach((preview) => {
        preview.style.backgroundImage = `url("${reader.result}")`
      });
    });
  }
};

const openUploadWindow = () => {
  uploadWindow.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadCloseButton.addEventListener('click', closeUploadWindow);
  document.addEventListener('keydown', addCloseUploadWindowHandler);

  uploadPicture();
  scaleImage();
  addEffect();
  validateUserText();
};

const closeUploadWindow = () => {
  uploadWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInput.value = '';
  uploadCloseButton.removeEventListener('click', closeUploadWindow);
  document.removeEventListener('keydown', addCloseUploadWindowHandler);

  scaleImageReset();
  effectReset();
  userTextReset();
};

const addCloseUploadWindowHandler = (evt) => {
  if (isEscapePushed(evt)) {
    closeUploadWindow();
  }
};

export { closeUploadWindow, openUploadWindow };
