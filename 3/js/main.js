const PHOTOS_COUNT = 25;
const COMMENTS_COUNT = PHOTOS_COUNT * 3;
let photoIdCounter = 1;

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

const testCommentsArray = createTestCommentsArray(COMMENTS_COUNT);

function getRandomArrElement(array) {
  return array[getRandomIntNumber(0, array.length - 1)];
}

function getUniqueId(usedIdArray) {
  let objId = getRandomIntNumber(100, 1000);
  while (usedIdArray.includes(objId)) {
    objId = getRandomIntNumber(100, 1000);
  }
  usedIdArray.push(objId);
  return objId;
}

function createRandomArray(elementsCount, sourceArray) {

  const resultArray = [];
  for (let i = 1; i <= elementsCount; i++) {
    let element = getRandomArrElement(sourceArray);
    while (resultArray.includes(element)) {
      element = getRandomArrElement(sourceArray);
    }
    resultArray.push(element);
  }
  return resultArray;
}

function createTestCommentsArray(commentsCount) {

  const commentArray = [];
  const tempCommentIdArray = [];

  for (let i = 1; i <= commentsCount; i++) {

    const objId = getUniqueId(tempCommentIdArray);

    const sentencesCount = getRandomIntNumber(1, 2);
    const commentMessage = createRandomArray(sentencesCount, PHRASES).join(' ');

    const commentObject = {
      id: objId,
      avatar: `img/avatar-${getRandomIntNumber(1, 6)}.svg`,
      message: commentMessage,
      name: getRandomArrElement(NAMES),
    };

    commentArray.push(commentObject);
  }
  return commentArray;
}

function getUniquePhotoId() {
  return photoIdCounter++;
}


const createPhotoObj = () => {
  const photoId = getUniquePhotoId();

  const commentsNumber = getRandomIntNumber(1, 3);
  const comments = createRandomArray(commentsNumber, testCommentsArray);

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: `описание к фотографии ${photoId}.jpg`,
    likes: getRandomIntNumber(15, 200),
    comments: comments
  };
};

const testPhotoStorage = Array.from({ length: PHOTOS_COUNT }, createPhotoObj);
// eslint-disable-next-line no-console
console.log(testPhotoStorage);

