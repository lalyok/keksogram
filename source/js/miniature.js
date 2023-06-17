import { showFullscreen } from './fullscreen-picture.js';

const miniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createMiniature = (pictureItem) => {
  let miniature = miniatureTemplate.cloneNode(true);
  miniature.querySelector('.picture__img').src = pictureItem.url;
  miniature.querySelector('.picture__comments').textContent = pictureItem.comments.length;
  miniature.querySelector('.picture__likes').textContent = pictureItem.likes;
  addMiniatureClickHandler(miniature, pictureItem);

  return miniature;
};

const addMiniatureClickHandler = (node, pictureItem) => {
  return node.addEventListener('click', (evt) => {
    evt.preventDefault;
    showFullscreen(pictureItem);
  });
};

const putCardsInContainer = (cards, picturesContainer, bufer) => {
  cards.forEach((card) => {
    bufer.appendChild(createMiniature(card));
  });
  picturesContainer.appendChild(bufer);
}

export { createMiniature, putCardsInContainer };
