const PHOTOS_COUNT = 25;
const COMMENTS_COUNT = PHOTOS_COUNT * 3;
const AVATARS_COUNT = 6;
const MAX_COMMENTS_PER_PHOTO = 4;
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

function getRandomIntNumber(min, max) {
  if ((!Number.isFinite(min) || !Number.isFinite(max)) || (min < 0 || max < 0)) {
    return NaN;
  }

  /*
  оптимизация функции под float-параметры с учетом предложенного варианта от HTMLAcademy
  https://up.htmlacademy.ru/profession/fullstack/4/javascript/27/tasks/8)
  */

  const lowerBound = Math.ceil(Math.min(min, max));
  const upperBound = Math.floor(Math.max(min, max));

  return Math.floor(Math.random() * (upperBound - lowerBound + 1) + lowerBound);
}

function checkStrLength(string, maxLength) {
  if (typeof string !== 'string' || !Number.isInteger(maxLength) || maxLength < 0) {
    return null;
  }
  return string.length <= maxLength;
}

checkStrLength('teststring', 6);

const testCommentsArray = createTestCommentsArray(COMMENTS_COUNT, MAX_SENTENCES_COUNT, PHRASES, AVATARS_COUNT, NAMES);

function getRandomArrElement(array) {
  return array[getRandomIntNumber(0, array.length - 1)];
}

function getUniqueId() {
  return Math.floor(Date.now() * Math.random());
}

function getRandElementsFromArr(elementsCount, sourceArray) {

  const resultArr = [];

  for (let i = 0; i < elementsCount; i++) {
    const element = getRandomArrElement(sourceArray);
    resultArr.push(element);
  }

  return resultArr;
}

function createTestCommentsArray(commentsCount, sentencesCount, sentencesArray, avatarsCount, namesArray) {

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
}

const createPhotoObj = (photoId, likesRange, commentsNumber, commentsArray ) => ({
  id: photoId,
  url: `photos/${photoId}.jpg`,
  description: `описание к фотографии ${photoId}.jpg`,
  likes: getRandomIntNumber(likesRange.MIN, likesRange.MAX),
  comments: getRandElementsFromArr(commentsNumber, commentsArray)
});

const createTestPhotoStorage = () => Array.from({ length: PHOTOS_COUNT }, (_, index) => createPhotoObj(index + 1, LIKES_RANGE, getRandomIntNumber(1, MAX_COMMENTS_PER_PHOTO), testCommentsArray));
createTestPhotoStorage();
