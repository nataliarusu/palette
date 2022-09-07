import * as elCreator from '../UI/createEl.js';
import { lightOrDark } from '../UI/mixcheckColours.js';
import {
  addColourGeneratorBarsListeners,
  updateInfoBtnsColour,
} from './paletteListeners.js';
import * as convertColour from '../UI/convertColour.js';

export function PaletteColour(colour, id) {
  this.rgbValue = colour;
  this.hexValue = convertColour.rgbToHex(this.rgbValue);
  this.secondaryValue = colour;
  this.colourTone = lightOrDark(this.rgbValue);
  this.id = id;
  this.DOMel;
}
PaletteColour.prototype = {
  render() {
    this.DOMel = elCreator.createWithClassAndAttr(
      'li',
      ['colour-generator--item'],
      'id',
      this.id
    );
    const colourInfoEl = elCreator.createWithClass('div', 'colour-generator--info');
    const leftBarEl = elCreator.createWithClassAndAttr(
      'div',
      ['colour-generator--bar'],
      'data-barposition',
      'left'
    );
    const rightBarEl = elCreator.createWithClassAndAttr(
      'div',
      ['colour-generator--bar'],
      'data-barposition',
      'right'
    );

    const inputColourEl = elCreator.createWithClassAndAttr(
      'input',
      ['colour-picker--input'],
      'type',
      'color'
    );
    inputColourEl.setAttribute('id', `${this.id}line`);
    inputColourEl.value = '#' + this.hexValue;
    const label = elCreator.createWithClassAndAttr(
      'label',
      ['colour-picker--label'],
      'for',
      `${this.id}line`
    );
    label.innerHTML = this.hexValue.toUpperCase();
    const secondaryInfoEl = elCreator.createWithClassAndAttr(
      'div',
      ['secondary-info'],
      'value',
      this.secondaryValue
    );
    secondaryInfoEl.innerHTML = this.secondaryValue;
    colourInfoEl.append(inputColourEl, label, secondaryInfoEl);
    const btns = elCreator.createWithClass('div', 'colour-generator-btns');
    const btnRemove = elCreator.createWithClassAndAttr(
      'div',
      ['colour-generator-btns--remove-btn', 'tooltip'],
      'data-tooltip',
      'remove'
    );
    btnRemove.append(elCreator.createIcon('clear'));   
    const btnCopy = elCreator.createWithClassAndAttr(
      'div',
      ['colour-generator-btns--copy-hex', 'tooltip'],
      'data-tooltip',
      'copy'
    );
    btnCopy.append(elCreator.createIcon('content_copy'));

    btns.append(btnRemove, btnCopy);
    this.DOMel.append(colourInfoEl, btns, leftBarEl, rightBarEl);

    this.DOMel.style.backgroundColor = '#' + this.hexValue;
    /**add listeners */
    addColourGeneratorBarsListeners(leftBarEl);
    addColourGeneratorBarsListeners(rightBarEl);
    btnCopy.addEventListener('click', () => {
      navigator.clipboard.writeText('#' + this.hexValue);
    });

    inputColourEl.addEventListener('input', (ev) => {
      this.DOMel.style.backgroundColor = ev.target.value;
      this.updateColour(ev.target.value);
      updateInfoBtnsColour(this.DOMel, this.colourTone); //
      label.innerHTML = this.hexValue.toUpperCase();
      secondaryInfoEl.innerHTML = this.rgbValue;
    });
    this.DOMel.addEventListener('mouseover', ()=>{
        btns.classList.add('front');
    });
    this.DOMel.addEventListener('mouseleave', ()=>{
        btns.classList.remove('front');
    })
   updateInfoBtnsColour(this.DOMel, this.colourTone);
    
    return this.DOMel;
  },
  updateColour(hex) {
    this.hexValue = hex.substring(1);
    this.rgbValue = convertColour.hexToRGB(hex);
    this.secondaryValue = this.rgbValue;
    this.colourTone = lightOrDark(this.rgbValue);
  },
  save() {},
};
