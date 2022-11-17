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

const getUniqRandElementsFromArr = (elementsCount, sourceArray) => {

  const uniqueSourceArray = Array.from(new Set(sourceArray));

  if (elementsCount > uniqueSourceArray.length) {
    return uniqueSourceArray;
  }

  const resultArr = [];

  for (let i = 0; i < elementsCount; i++) {
    let element = getRandomArrElement(uniqueSourceArray);
    while (resultArr.includes(element)){
      element = getRandomArrElement(uniqueSourceArray);
    }

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

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  getRandomIntNumber,
  getUniqueId,
  getRandomArrElement,
  getUniqRandElementsFromArr,
  checkStrLength,
  isEscapeKey,
  debounce
};
