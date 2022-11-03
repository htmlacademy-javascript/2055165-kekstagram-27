import { getUniqueId, getRandomIntNumber, getRandomArrElement, getRandElementsFromArr } from './utils.js';

const PHOTOS_COUNT = 25;
const COMMENTS_COUNT = PHOTOS_COUNT * 3;
const AVATARS_COUNT = 6;
const MAX_COMMENTS_PER_PHOTO = 15;
const MAX_SENTENCES_COUNT = 2;

const LIKES_RANGE = {
  MIN: 15,
  MAX: 200
};

const NAMES = ['Полина', 'Аиша', 'Юлия', 'София', 'Евдокия', 'Кристина', 'Марк', 'Ксения', 'Мария', 'Герман', 'Даниил', 'Алина',
  'Василиса', 'Степан', 'Анна', 'Ева', 'Андрей', 'Вера', 'Иван', 'Александр', 'Кира', 'Илья', 'Аделина', 'Маргарита', 'Михаил',
  'София', 'Элина', 'Леонид', 'Вадим', 'Ольга', 'Павел', 'Владислав', 'Георгий', 'Вячеслав', 'Дмитрий', 'Милана', 'Тимофей', 'Мила',
  'Матвей', 'Антон', 'Лев', 'Майя', 'Артемий', 'Мирон', 'Екатерина', 'Варвара', 'Максим', 'Елизавета', 'Агата', 'Руслан'
];

const PHRASES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота, и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const testCommentsArray = ((commentsCount, sentencesCount, sentencesArray, avatarsCount, namesArray) => {

  const commentsArray = [];
  for (let i = 1; i <= commentsCount; i++) {
    const commentObject = {
      id: getUniqueId(),
      avatar: `img/avatar-${getRandomIntNumber(1, avatarsCount)}.svg`,
      message: getRandElementsFromArr(getRandomIntNumber(1, sentencesCount), sentencesArray).join(' '),
      name: getRandomArrElement(namesArray),
    };

    commentsArray.push(commentObject);
  }
  return commentsArray;
})(COMMENTS_COUNT, MAX_SENTENCES_COUNT, PHRASES, AVATARS_COUNT, NAMES);

const createPhotoMock = (photoId, likesRange, commentsNumber, commentsArray) => ({
  id: +photoId,
  url: `photos/${photoId}.jpg`,
  description: `описание к фотографии ${photoId}.jpg`,
  likes: getRandomIntNumber(likesRange.MIN, likesRange.MAX),
  comments: getRandElementsFromArr(commentsNumber, commentsArray)
});

const createPhotoMocksArray = () => Array.from({ length: PHOTOS_COUNT }, (_, index) => createPhotoMock(index + 1, LIKES_RANGE, getRandomIntNumber(1, MAX_COMMENTS_PER_PHOTO), testCommentsArray));

export { createPhotoMocksArray };
