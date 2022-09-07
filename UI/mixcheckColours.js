export function mixColoursRGBarr(firstColour, secondColour) {
  const mix = [
    Math.floor((firstColour[0] + secondColour[0] + 1) / 2),
    Math.floor((firstColour[1] + secondColour[1] + 1) / 2),
    Math.floor((firstColour[2] + secondColour[2] + 1) / 2),
  ]; //+1 because from 0-255
  return mix;
}

export function lightenColour(rgb) {
  const [r, g, b] = rgb;
  if (r + g + b >= 255 * 1.5) {
    return [r, g, b];
  } else {
    const lightened = lightenDarkenColor([r, g, b], 20);
    console.log(lightened, 'call lightnen again');
    return lightenColour(lightened);
  }
}

export function darkenColour(rgb) {
  const [r, g, b] = rgb;
  if (r + g + b < 255 * 1.5) {
    return [r, g, b];
  } else {
    const darkened = lightenDarkenColor([r, g, b], -20);
    console.log(darkened, 'call again darken');
    return darkenColour(darkened);
  }
}

export function lightenDarkenColor(colorCode, amount) {
  const newColor = [];
  for (let i = 0; i < colorCode.length; i++) {
    if (colorCode[i] + amount > 255) {
      newColor.push(255);
    } else if (colorCode[i] + amount < 0) {
      newColor.push(0);
    } else {
      newColor.push(colorCode[i] + amount);
    }
  }

  return newColor;
}

/**
 *
 * @param {* array of rgb} colour
 * @returns 'light'or 'dark'
 */
// // HSP equation from http://alienryderflex.com/hsp.html
export function lightOrDark(colour) {
  //for text colour inside
  /*
  const brightness= Math.sqrt( 0.299*colour[0]*colour[0] + 0.587*colour[1]*colour[1] + 0.114*colour[2]*colour[2] );
  return brightness>127.5?'light':'dark';*/
  const average = (colour[0] + colour[1] + colour[2]) / 3;
  return average > 127 ? 'light' : 'dark';
}

export const mixHex = (main, secondary) => {
  const MAXvalue = 360;
  let newColour;

  if (main >= 180 && secondary < 180) {
    if (main - secondary < 180) {
      newColour = Math.abs(MAXvalue - main - secondary) / 2;
    } else if (main - secondary > 180) {
      newColour = main + (MAXvalue - main + secondary) / 2;
    }
  } else {
    //main<=180||main<secondary&&main>=180&&secondary>=180

    newColour = main + (secondary - main) / 2; //30+(225-30)/2
  }

  if (newColour > MAXvalue) {
    newColour -= MAXvalue;
  }
  console.log(newColour, ' new'); //-6.2

  return newColour;
};
