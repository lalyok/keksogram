import { getRandomNumber, getUniqueNumbers } from './util.js';

const MAX_IMAGES = 25;
const AVATARS = 6;
const Comments = {
  MIN_LENGTH: 1,
  MAX_LENGTH: 2,
  MIN_COUNT: 1,
  MAX_COUNT: 5,
  MIN_ID: 1,
  MAX_ID: 200,
};
const Likes = {
  MIN: 15,
  MAX: 200,
};

const cardDescriptions = [
  'Салатики',
  'Я и мои друзьяшки',
  'В зале',
];

const commentsText = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const commentsAuthors = [
  'Андрей',
  'Иван',
  'Оксана',
  'Серж',
];

const getMessage = (text, commentLength) => {
  let message;

  if (getRandomNumber(commentLength.MIN_LENGTH, commentLength.MAX_LENGTH) === 1) {
    message = text[getRandomNumber(0, text.length - 1)];
  } else {
    let [firstSentence, secondSentance] = getUniqueNumbers(0, text.length - 1, commentLength.MAX_LENGTH)
    message = text[firstSentence] + ' ' + text[secondSentance];
  }

  return message
}

const getComments = (quantity, messages, commentTemplate, authors, avatars) => {
  let comments = [];
  const commentsId = getUniqueNumbers(commentTemplate.MIN_ID, commentTemplate.MAX_ID, quantity);

  for (let i = 0; i < quantity; i++) {
    comments.push({
      id: commentsId[i],
      avatar: 'img/avatar-' + String(getRandomNumber(1, avatars)) + '.svg',
      message: getMessage(messages, commentTemplate),
      name: authors[getRandomNumber(0, authors.length - 1)],
    });
  }

  return comments;
}

const createCardsData = () => {
  let cards = [];
  const cardsId = getUniqueNumbers(1, MAX_IMAGES, MAX_IMAGES) ;

  for (let i = 0; i < MAX_IMAGES; i++) {
    cards.push({
      id: cardsId[i],
      url: 'photos/' + String(cardsId[i]) + '.jpg',
      description: cardDescriptions[getRandomNumber(0, cardDescriptions.length - 1)],
      likes: getRandomNumber(Likes.MIN, Likes.MAX),
      comments: getComments(getRandomNumber(Comments.MIN_COUNT, Comments.MAX_COUNT), commentsText, Comments, commentsAuthors, AVATARS),
    });
  }

  return cards;
}

export { createCardsData };
