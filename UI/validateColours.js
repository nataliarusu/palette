import { colourTypes } from './constants.js';

/**
 *
 * @param {array} colour array of rgb or hsl numbers
 * @returns true if colour values are valid for given type
 */
export const validateRGB_HSL = (colour, type) => {
  let isValid;
  console.log(colour, type, colourTypes.RGB);
  switch (type) {
    case colourTypes.HSL:
      isValid =
        (colour[0] > 0 &&
          colour[0] < 360 &&
          colour[1] >= 0 &&
          colour[1] <= 100 &&
          colour[2] >= 0 &&
          colour[2] <= 100) ||
        false;
      console.log(colour);
      break;
    case colourTypes.RGB:
      console.log(type);
      isValid =
        (colour[0] >= 0 &&
          colour[0] <= 255 &&
          colour[1] >= 0 &&
          colour[1] <= 255 &&
          colour[2] >= 0 &&
          colour[2] <= 255) ||
        false;
      break;
  }
  return isValid;
};
/**
 *
 * @param {string} colour
 * @returns true if value pass regex test
 */
export const validateHEXcolour = (colour) => {
  const regex = /^[0-9a-fA-F]{6}$/;
  return regex.test(colour);
};
/**
 *
 * @param {string} str
 * @returns array of numbers
 */
export const convertStrToNumber = (str) => {
  const arr = str.split(',');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Number(arr[i]);
  }

  return arr;
};
