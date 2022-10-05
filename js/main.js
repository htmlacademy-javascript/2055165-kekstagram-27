function getRandomIntNumber(min, max){
  if ((!Number.isFinite(min) || !Number.isFinite(max)) || (min < 0 || max < 0)) {
    return NaN;
  }

  if (max < min) {
    const tmp = min;
    min = max;
    max = tmp;
  }

  return Math.round((min - 0.5) + Math.random() * (max - min + 0.5));
}

function checkStrMaxLength(string, maxLength) {
  return string.length <= maxLength;
}

getRandomIntNumber(50, 1);

checkStrMaxLength('stringtestlength', 140);
