import { createMiniature } from './miniature.js';
import { getRandomNumber } from './util.js';

const MAX_RANDOM_CARDS = 10;
const filter = document.querySelector('.img-filters');
const filterForm = filter.querySelector('.img-filters__form');
const defaultButton = filter.querySelector('#filter-default');
const randomButton = filter.querySelector('#filter-random');
const discussedButton = filter.querySelector('#filter-discussed');

const removeCards = (container) => {
  container.querySelectorAll('.picture').forEach((child) => {
    child.remove();
  });
};

const compareCardsComments = (cardA, cardB) => {
  const commentsA = cardA.comments.length;
  const commentsB = cardB.comments.length;

  return commentsB - commentsA;
}

const showFilter = (cards, bufer, cb) => {
  filter.classList.remove('img-filters--inactive');
  const initialCards = cards.slice();

  filterForm.addEventListener('click', (evt) => {
    evt.preventDefault();
    filterForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    removeCards(bufer);

    if (evt.target === defaultButton) {
      initialCards.forEach((card) => {
        bufer.appendChild(createMiniature(card));
      });
      cb();
    }

    if (evt.target === randomButton) {
      for (let i = 0; i < MAX_RANDOM_CARDS; i++) {
        const index = getRandomNumber(0, initialCards.length - 1);
        bufer.appendChild(createMiniature(initialCards[index]));
      }
      cb();
    }

    if (evt.target === discussedButton) {
      const sortedCards = initialCards.slice().sort(compareCardsComments);
      sortedCards.forEach((card) => {
        bufer.appendChild(createMiniature(card));
      })
      cb();
    }
  });
}

export { showFilter, removeCards };
