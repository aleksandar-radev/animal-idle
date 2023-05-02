export function mergeObjectsRecursive(obj1, obj2) {
  const result = { ...obj1 };
  Object.keys(obj2).forEach((key) => {
    if (typeof obj2[key] === 'object' && obj2[key] !== null) {
      if (typeof result[key] === 'object' && result[key] !== null) {
        result[key] = mergeObjectsRecursive(result[key], obj2[key]);
      } else {
        result[key] = { ...obj2[key] };
      }
    } else {
      result[key] = obj2[key];
    }
  });
  return result;
}

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
