import * as constants from '../UI/constants.js';
import * as colourMixer from '../UI/mixcheckColours.js';
import {
  getSplitComplementaryColours,
  getComplementaryColours,
  getTradicColours,
  getRandom,
} from '../UI/generatePaletteRange.js';
import { PaletteColour } from './PaletteColour.js';
import {convertHexToRGB} from '../UI/convertColour.js';
const onhoverDomContainer = document.querySelector('.onhover-line-container');

/**
 *
 * @param {DOMel} ul
 * @param {function} gradient pointer to function to update gradient
 */
export function Palette(ul, gradient) {
  this.paletteColours = [];
  this.paletteDOMel = ul;
  this.hexcolours = [];
  this.updateGradient = gradient;
}

Palette.prototype = {
  constructor: Palette,
  countColour: 0,
  buid: function (colours) {
    //create random palette
    const generatedColours = getRandom(colours);
    for (let i = 0; i < generatedColours.length; i++) {
      const pColour = new PaletteColour(generatedColours[i], i);
      this.paletteColours.push(pColour);
      this.hexcolours.push('#' + pColour.hexValue);
      this.countColour = i;
      this.render(pColour);
    }
    this.updateGradient();
  },
  render(paletteColour, id) {
    //If the existingNode is null, the insertBefore() inserts the newNode at the end of the parentNode‘s child nodes
    //this.paletteDOMel.append(paletteColour.render());
    if (id === 'last') {
      this.paletteDOMel.append(paletteColour.render());
    } else {
      //I don't check id='first' because I will receive id of li el that was triggered
      const sibling = document.getElementById(`${id}`);
      this.paletteDOMel.insertBefore(paletteColour.render(), sibling);
    }
  },

  add(prevPaletteColour, nextPaletteColour, idx, nextSiblingId) {
    this.countColour++;
    if (this.paletteColours.length >= 10) {
      onhoverDomContainer.classList.remove('front'); //should add something more here
      return;
    }
    const mixedColour = colourMixer.mixColoursRGBarr(
      prevPaletteColour,
      nextPaletteColour
    );
    const newPColour = new PaletteColour(mixedColour, this.countColour);
    this.paletteColours.splice(idx, 0, newPColour);
    onhoverDomContainer.classList.remove('front');
    this.render(newPColour, nextSiblingId);
    this.hexcolours.splice(idx, 0, '#' + newPColour.hexValue);
    this.updateGradient();
  },
  remove(li) {
    if (this.paletteColours.length < 3) {
      return;
    }
    const idx = this.paletteColours.findIndex((el) => el.id === Number(li.id)); //str from dom
    this.paletteColours.splice(idx, 1);
    this.hexcolours.splice(idx, 1);
    this.paletteDOMel.removeChild(li);
  },
  rebuildPalette(rule, colour, rgbColour) {
    this.paletteDOMel.innerHTML = '';
    this.paletteColours = [];
    this.hexcolours = [];
    let generateColours;
    switch (rule) {
      case constants.colourRules.COMPLEMENTARY:
        generateColours = getComplementaryColours(colour, rgbColour);
        break;
      case constants.colourRules.SPLIT_COMPLEMENTARY:
        generateColours = getSplitComplementaryColours(colour, rgbColour);
        break;
      case constants.colourRules.TRADIC:
        generateColours = getTradicColours(colour, rgbColour);
        break;
      case constants.colourRules.RANDOM:
        generateColours= getRandom(colour, rgbColour);
    }
    for (let i = 0; i < generateColours.length; i++) {
      const pColour = new PaletteColour(generateColours[i], this.countColour);
      this.paletteColours.push(pColour);
      this.hexcolours.push('#' + pColour.hexValue);
      this.countColour++;
      this.render(pColour);
    }
    this.updateGradient();
  },
  buildSaved(colours){
    this.paletteDOMel.innerHTML = '';
    this.paletteColours = [];
    this.hexcolours = [];
    for (let i = 0; i < colours.length; i++) {
      const colour=convertHexToRGB(colours[i]);
      const pColour = new PaletteColour(colour, this.countColour);
      this.paletteColours.push(pColour);
      this.hexcolours.push('#'+colours[i]);
      this.countColour++;
      this.render(pColour);
    }
    this.updateGradient();
  }
};
