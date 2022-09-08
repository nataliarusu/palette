import * as constants from './UI/constants.js';
import { Palette } from './Palette/Palette.js';
import { generateGradient } from './UI/generateGradient.js';
import { addNewColourLine } from './UI/onAddNewColourLine.js';
import { toggleFormVisibility } from './UI/userMainColourHandle.js';
import { generateHslMainColor } from './UI/generatePaletteRange.js';
import { savePalette, getSavedColours } from './UI/handleLocalStorage.js';
import { exportHandler} from './UI/exportJSON.js';

const downloadJSONBtn=document.querySelector('.downloadJSON');
const downloadTxtBtn=document.querySelector('.downloadText');
const addColourBtn = document.querySelector('.add-line-btn');
const savePaletteBtn = document.querySelector('#save-palette--btn');
const randomizeSCcolourBtn = document.querySelector(
  '#randomize--split-complementary-btn'
);
const randomizeCcolourBtn = document.querySelector(
  '#randomize--complementary-btn'
);
const randomizeTradicColourBtn = document.querySelector(
  '#randomize-tradic-btn'
);
const randomizeRandomColourBtn = document.querySelector(
  '#randomize-random-btn'
);
const showHideFormBtn = document.querySelector('#toggle-form-btn');
const ul = document.querySelector('.colours-generator--container');

const showSavedPaletteBtn = document.getElementById('show-saved-palette');
const vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
);
ul.style.height = `${vh - ul.getBoundingClientRect().y}px`;

function updateGradient() {
  generateGradient(userPalette.hexcolours);
}

const userPalette = new Palette(ul, updateGradient);
userPalette.buid(generateHslMainColor(constants.colourRules.RANDOM)); //random rule is default

addColourBtn.addEventListener('click', (ev) => {
  addNewColourLine(ev.currentTarget, userPalette, updateGradient);
});

randomizeSCcolourBtn.addEventListener('click', () => {
  userPalette.rebuildPalette(
    constants.colourRules.SPLIT_COMPLEMENTARY,
    generateHslMainColor(constants.colourRules.SPLIT_COMPLEMENTARY)
  );
  updateGradient();
});
randomizeCcolourBtn.addEventListener('click', () => {
  userPalette.rebuildPalette(
    constants.colourRules.COMPLEMENTARY,
    generateHslMainColor(constants.colourRules.COMPLEMENTARY)
  );
  updateGradient();
});
randomizeTradicColourBtn.addEventListener('click', () => {
  userPalette.rebuildPalette(
    constants.colourRules.TRADIC,
    generateHslMainColor(constants.colourRules.TRADIC)
  );
  updateGradient();
});
randomizeRandomColourBtn.addEventListener('click', () => {
  userPalette.rebuildPalette(
    constants.colourRules.RANDOM,
    generateHslMainColor(constants.colourRules.RANDOM)
  );
  updateGradient();
});

showHideFormBtn.addEventListener('click', (ev) => {
  toggleFormVisibility(ev.currentTarget, userPalette);
});

savePaletteBtn.addEventListener('click', () => {
  const colours = userPalette.paletteColours.map((el) => el.hexValue);
  savePalette(colours);
});
showSavedPaletteBtn.addEventListener('click', () => {
  const colours = getSavedColours();
  if (!colours) {
    console.log('no saved colours');
    return;
  } else {
    userPalette.buildSaved(colours);
  }
});

ul.addEventListener('click', (ev) => {
  if (ev.target.parentElement.dataset.tooltip === 'remove') {
    //span ev.target
    const li = ev.target.closest('li');
    userPalette.remove(li);
    updateGradient();
  }
});

downloadTxtBtn.addEventListener('click',()=>{
  const text=userPalette.hexcolours.toString();
  downloadTxtBtn.setAttribute('href', 'data:text/plain; charset = utf-8, ' + encodeURIComponent(text));
}, false);

downloadJSONBtn.addEventListener('click',()=>{
  exportHandler(userPalette.hexcolours);
});