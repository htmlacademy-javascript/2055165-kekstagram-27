const getRandomIntNumber = (min, max) => {
  if ((!Number.isFinite(min) || !Number.isFinite(max)) || (min < 0 || max < 0)) {
    return NaN;
  }

  const lowerBound = Math.ceil(Math.min(min, max));
  const upperBound = Math.floor(Math.max(min, max));

  return Math.floor(Math.random() * (upperBound - lowerBound + 1) + lowerBound);
};

const getRandomArrElement = (array) => array[getRandomIntNumber(0, array.length - 1)];

const getUniqueId = () => Math.floor(Date.now() * Math.random());

const getRandElementsFromArr = (elementsCount, sourceArray) => {

  const resultArr = [];

  for (let i = 0; i < elementsCount; i++) {
    const element = getRandomArrElement(sourceArray);
    resultArr.push(element);
  }

  return resultArr;
};

const checkStrLength = (string, maxLength) => {
  if (typeof string !== 'string' || !Number.isInteger(maxLength) || maxLength < 0) {
    return null;
  }
  return string.length <= maxLength;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {
  getRandomIntNumber,
  getUniqueId,
  getRandomArrElement,
  getRandElementsFromArr,
  checkStrLength,
  isEscapeKey,
};
