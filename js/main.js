function getRandomIntNumber(min, max) {
  if ((!Number.isFinite(min) || !Number.isFinite(max)) || (min < 0 || max < 0)) {
    return NaN;
  }

  if (max < min) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkStrLength(string, maxLength) {
  if (typeof string !== 'string' || !Number.isInteger(maxLength) || maxLength < 0) {
    return null;
  }
  return string.length <= maxLength;
}

getRandomIntNumber(50, 1);

checkStrLength('teststring', 6);
