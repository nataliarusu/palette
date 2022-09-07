import * as colourMixer from './mixcheckColours.js';
import { convertHSLtoRGB } from './convertColour.js';

const randomIntMinMax = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const shuffle = (array) => {
  const colours = [...array];
  for (let i = colours.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    // swap elements array[i] and array[j]
    [colours[i], colours[j]] = [colours[j], colours[i]];
  }
  return colours;
};

export function generateHslMainColor(type) {
  const hue = randomIntMinMax(0, 360);
  let saturation;
  let lightness;
  if (type === 'SplitComplementary') {
    saturation = randomIntMinMax(70, 80);
    lightness = randomIntMinMax(40, 45);
  }
  if (type === 'Complementary') {
    saturation = randomIntMinMax(30, 100);
    lightness = randomIntMinMax(20, 40);
  }
  if (type === 'Tradic' || type === 'Random') {
    saturation = randomIntMinMax(41, 100);
    lightness = randomIntMinMax(15, 25);
  }

  return [hue, saturation, lightness];
}
//colour theory https://www.youtube.com/watch?v=YeI6Wqn4I78
/**
 *
 * @param {*array of hsl numbers} mainHSL
 * @param {*array of rgb numbers} rgb
 * @returns array of array of rgb numbers to generate a palette
 */

export const getSplitComplementaryColours = (mainHSL, mainRgb) => {
  /* rule
    secondary colours' distance on the wheel is 30 (I did slightly more to randomize)
    secondary colours opposite to a main colour on the wheel
    thirdly colours are mid between main and secondary respectively
    */
  const mainColour = mainHSL[0];

  const MAXvalue = 360;
  const zeroPoint =
    mainColour >= 180 ? mainColour - 180 : mainColour - 180 + MAXvalue; //24-180+360

  //the highest possible is -15, for inlarge range I add -30 more and randomize;
  let primaryLScolour = zeroPoint - randomIntMinMax(15, 45); //zeroPoint-15, or max zeroPoint-45

  if (primaryLScolour <= 0) {
    primaryLScolour += MAXvalue; //if -30 => -30+360
  }

  let primaryRSColour = zeroPoint + randomIntMinMax(15, 45);
  if (primaryRSColour > MAXvalue) {
    primaryRSColour -= MAXvalue;
  }

  const primaryLScolourHSL = [
    primaryLScolour,
    randomIntMinMax(80, 100),
    randomIntMinMax(45, 50),
  ]; //S (80-100), L(45-50)
  const primaryRSColourHSL = [
    primaryRSColour,
    randomIntMinMax(40, 70),
    randomIntMinMax(15, 40),
  ]; //S (40-70), L(15-40)

  const primaryLScolourRGB = convertHSLtoRGB(primaryLScolourHSL);
  const primaryRSColourRGB = convertHSLtoRGB(primaryRSColourHSL);
  const mainColourRGB = mainRgb ? mainRgb : convertHSLtoRGB(mainHSL);
  const secondaryLScolourRGB = colourMixer.mixColoursRGBarr(
    mainColourRGB,
    primaryLScolourRGB
  );
  const secondaryRScolourRGB = colourMixer.mixColoursRGBarr(
    mainColourRGB,
    primaryRSColourRGB
  );

  return [
    primaryLScolourRGB,
    secondaryLScolourRGB,
    mainColourRGB,
    secondaryRScolourRGB,
    primaryRSColourRGB,
  ];
};

//the main colour is the darkest one, and all other colours are the lighter variant of the main colour
function monochromatic(mainColour) {}

//two colours opposit to each other in the colour wheel, they will be first and last in the 5 colours
export function getComplementaryColours(mainColourHSL, mainRgb) {
  /*  main colour => saturation=(30, 100); lightness=(15, 25); */
  const primaryRS_Hue =
    mainColourHSL[0] >= 180 ? mainColourHSL[0] - 180 : mainColourHSL[0] + 180;
  const secondaryForMainColour_HSL = [
    mainColourHSL[0],
    randomIntMinMax(70, 80),
    randomIntMinMax(46, 50),
  ]; //mid
  const tirtiaryForMainColour_HSL = [mainColourHSL[0], 100, 75]; //lighter

  const primaryRS_HSL = [primaryRS_Hue, mainColourHSL[1], mainColourHSL[2]];
  const secondaryForPrimaryRS_HSL = [
    primaryRS_HSL[0],
    primaryRS_HSL[1],
    randomIntMinMax(50, 70),
  ]; //mid

  const tirtiaryForMainColour_RGB = convertHSLtoRGB(tirtiaryForMainColour_HSL);
  const secondaryForMainColour_RGB = convertHSLtoRGB(
    secondaryForMainColour_HSL
  );
  const mainColour_RGB = mainRgb ? mainRgb : convertHSLtoRGB(mainColourHSL);
  const primaryRS_RGB = convertHSLtoRGB(primaryRS_HSL);
  const secondaryForPrimaryRS_RGB = convertHSLtoRGB(secondaryForPrimaryRS_HSL);

  return [
    mainColour_RGB,
    secondaryForMainColour_RGB,
    tirtiaryForMainColour_RGB,
    secondaryForPrimaryRS_RGB,
    primaryRS_RGB,
  ];
}

//3 colours in colour wheel, 360/3=120deg between them
export function getTradicColours(mainColourHSL, mainRgb) {
  const mainColourHue = mainColourHSL[0];

  const MAXvalue = 360;
  const firstColourHue =
    mainColourHue + 120 > MAXvalue
      ? mainColourHue + 120 - MAXvalue
      : mainColourHue + 120;
  const secondColourHue =
    mainColourHue + 240 > MAXvalue
      ? mainColourHue + 240 - MAXvalue
      : mainColourHue + 240;

  const mainColourRGB = mainRgb ? mainRgb : convertHSLtoRGB(mainColourHSL);
  const firstPrimaryColourRGB = convertHSLtoRGB([
    firstColourHue,
    randomIntMinMax(80, 99),
    randomIntMinMax(20, 70),
  ]); //
  const secondaryToFirstPrimaryColourRGB = colourMixer.mixColoursRGBarr(
    mainColourRGB,
    firstPrimaryColourRGB
  );
  const secondPrimaryColourRGB = convertHSLtoRGB([
    secondColourHue,
    randomIntMinMax(90, 99),
    randomIntMinMax(50, 70),
  ]);
  const secondaryToSecondPrimaryColourRGB = colourMixer.mixColoursRGBarr(
    mainColourRGB,
    secondPrimaryColourRGB
  );

  return [
    firstPrimaryColourRGB,
    secondaryToFirstPrimaryColourRGB,
    mainColourRGB,
    secondaryToSecondPrimaryColourRGB,
    secondPrimaryColourRGB,
  ];
}

//the main colour is the darkest one, and all other colours are the lighter variant of the main colour
export function getRandom(mainColourHSL, mainRgb) {
  const mainColourHue = mainColourHSL[0];

  const colourHue = (mhue, deg) => {
    return mhue + deg > MAXvalue ? mhue + deg - MAXvalue : mhue + deg;
  };
  //360/5=60, 60 +-30=> main+ 30or60
  const MAXvalue = 360;
  const firstColourHue = colourHue(mainColourHue, randomIntMinMax(30, 60));
  const secondColourHue = colourHue(mainColourHue, randomIntMinMax(61, 121));
  const thirdColourHue = colourHue(mainColourHue, randomIntMinMax(122, 182));
  const forthColourHue = colourHue(mainColourHue, randomIntMinMax(183, 243));

  const firstColour_HSL = [
    firstColourHue,
    randomIntMinMax(30, 70),
    randomIntMinMax(15, 70),
  ]; //s=30-70, l=15-24
  const secondColour_HSL = [
    secondColourHue,
    randomIntMinMax(30, 70),
    randomIntMinMax(24, 70),
  ]; //s=30-70, l=24-70
  const thirdColour_HSL = [
    thirdColourHue,
    randomIntMinMax(30, 100),
    randomIntMinMax(24, 70),
  ]; //s=30-100, l=24-70
  const forthColour_HSL = [
    forthColourHue,
    randomIntMinMax(30, 100),
    randomIntMinMax(24, 70),
  ]; //s=30-100, l=24-70

  const mainColour_RGB = mainRgb ? mainRgb : convertHSLtoRGB(mainColourHSL);
  const firstColour_RGB = convertHSLtoRGB(firstColour_HSL);
  const secondColour_RGB = convertHSLtoRGB(secondColour_HSL);
  const thirdColour_RGB = convertHSLtoRGB(thirdColour_HSL);
  const forthColour_RGB = convertHSLtoRGB(forthColour_HSL);

  const shuffled = shuffle([
    firstColour_RGB,
    secondColour_RGB,
    thirdColour_RGB,
    forthColour_RGB,
  ]);

  return [mainColour_RGB, ...shuffled];
}
