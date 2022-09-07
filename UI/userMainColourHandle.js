import * as errorHandler from './errorHandler.js';
import { colourTypes } from './constants.js';
import { convertRGBtoHSL, convertHexToRGB } from './convertColour.js';
import { validateRGB_HSL, validateHEXcolour, convertStrToNumber } from './validateColours.js';

const form = document.querySelector('#generate-palette--f');
const userColourInput = form.querySelector('#palette-main-colour');

let palette;

/**
 * @param {* event.currentTarget } ev button
 * @param {*Palette object} p 
 */

export const toggleFormVisibility=(btn,p)=>{
  palette=p;
  
  if(form.classList.contains('visible')){
    form.classList.remove('visible');
    btn.innerHTML='Show form';
  }
  else{
    form.classList.add('visible');
    btn.innerHTML='Hide form';
  }
}


const generatePaletteHandler = (ev) => {
  ev.preventDefault();
  const colourRule = ev.target.querySelector('#colour-rule').value;
  let colourType = ev.target.querySelector('#colour-type').value;
  let userColour = userColourInput.value;
  console.log(userColour)
  let isValidColour;
  if (userColour.trim()) {
    if (colourType === colourTypes.HEX) {
      isValidColour=validateHEXcolour(userColour);
    } else {
      userColour = convertStrToNumber(userColour);
      isValidColour=validateRGB_HSL(userColour, colourType);
    }
  } else{//if input is empty don't validate
    errorHandler.displayError('The colour value should not be empty', userColourInput);
    return;
  }

  //is rgb? hsl, hex
  if (isValidColour) {
    let hslcolour=userColour;
    let userRGBcolour;
    if(colourType===colourTypes.RGB){
        userRGBcolour=userColour;
        hslcolour = convertRGBtoHSL(userColour);
    }
    if(colourType===colourTypes.HEX){
      userRGBcolour=convertHexToRGB (userColour);
      hslcolour = convertRGBtoHSL(userRGBcolour);      
    }
    palette.rebuildPalette(colourRule, hslcolour, userRGBcolour);
  } else {
    errorHandler.displayError('The colour invalid', userColourInput);
    //userColourInput.errorHandler.
  }
};
userColourInput.addEventListener('focus',(ev)=>{
  errorHandler.removeError(ev.target);
});
form.addEventListener('submit', generatePaletteHandler);
