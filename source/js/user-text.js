import { checkLength, isEscapePushed } from './util.js'

const MAX_HASHTAGS = 5;
const HASHTAG_MAX_LENGTH = 19;
const HASHTAG_SYMBOLS = /[\wА-Яа-я]/;
const COMMENT_MAX_LENGTH = 140;

const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const showError = (input) => {
  if (!input.checkValidity()) {
    hashtagField.style.border = '2px solid red';
  } else {
    hashtagField.style.border = '';
  }
}

const checkHashtag = () => {
  let message = '';
  let words = hashtagField.value.split(' ').filter(word => word !== '');
  let loweredWords = [];

  if (words.length > MAX_HASHTAGS) {
    message = 'Должно быть не больше ' + MAX_HASHTAGS + ' хэштегов';
  }

  words.forEach((word) => {
    if (word[0] !== '#') {
      message = 'Хэштег должен начинаться со знака #';
    } else if (word.length === 1) {
      message = 'Хэштег не может состоять из одного знака #';
    } else if (word.length > HASHTAG_MAX_LENGTH) {
      message = 'Хэштег должен быть короче ' + (HASHTAG_MAX_LENGTH + 1) + ' символов';
    }

    for (let i = 1; i < word.length; i++) {
      if (word[i].search(HASHTAG_SYMBOLS) === -1) {
        message = 'Хэштег может содержать только буквы, цифры и _';
      }
    }

    loweredWords.push(word.toLowerCase())
  });

  loweredWords.forEach((currentItem, index, array) => {
    for (let i = index + 1; i <= array.length - 1; i++) {
      if (currentItem === array[i]) {
        message = 'Хэштеги не должны повторяться';
      }
    }
  });

  hashtagField.setCustomValidity(message);
  hashtagField.reportValidity();
  showError(hashtagField);
};

const checkComment = () => {
  if (checkLength(commentField.value, COMMENT_MAX_LENGTH)) {
    commentField.setCustomValidity('');
  } else {
    commentField.setCustomValidity('Комментарий не может быть длиннее ' + COMMENT_MAX_LENGTH + ' символов');
  }
  commentField.reportValidity();
};

const closeWindowCancel = (evt) => {
  if (isEscapePushed(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
};

const validateUserText = () => {
  hashtagField.addEventListener('input', checkHashtag);
  commentField.addEventListener('input', checkComment);
  hashtagField.addEventListener('keydown', closeWindowCancel);
  commentField.addEventListener('keydown', closeWindowCancel);
};

const userTextReset = () => {
  hashtagField.removeEventListener('input', checkHashtag);
  commentField.removeEventListener('input', checkComment);
  hashtagField.removeEventListener('keydown', closeWindowCancel);
  commentField.removeEventListener('keydown', closeWindowCancel);
  hashtagField.value = '';
  commentField.value = '';
};

export { validateUserText, userTextReset, hashtagField, commentField };
