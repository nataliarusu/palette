import { createWithClassAndAttr } from './createEl.js';
const modal = document.querySelector('.modal');
const backdrop = document.querySelector('.backdrop');
const coloursContainer = document.getElementById('css-name-form');
const exportBtn = document.querySelector('.exportJSON');
const closeExportBtn=document.querySelector('.exportJSON-passive');

function exportJSONHandler() {
  const colours = {};
  const inputs = Array.from(coloursContainer.querySelectorAll('input'));
  
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const label = coloursContainer.querySelector(`label[for=${input.id}]`);
    let name = input.value;
    if (!name.trim()) {
      name = `Colour${i + 1}`;
    }
    const value = label.textContent;
    colours[name] = value; //dynamicly add property
  }

  let dataStr = JSON.stringify(colours);
  let dataUri =
    'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  let fileName = 'palette.json';

  exportBtn.setAttribute('href', dataUri);
  exportBtn.setAttribute('download', fileName);
  closeModalHandler();
}
export const exportHandler = (hexcolours) => {
  toggleBackdrop();
  generateModal(hexcolours);
};

const toggleBackdrop = () => {
  modal.classList.toggle('bm-visible');
  backdrop.classList.toggle('bm-visible');
};
const generateModal = (colours) => {
  //hex colours array of user palette
  const nameLabel=document.createElement('span');
  const valueLabel=document.createElement('span');
  nameLabel.innerHTML='Name';
  valueLabel.innerHTML='Value';
  coloursContainer.append(nameLabel, valueLabel);
  for (let i = 0; i < colours.length; i++) {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('value', `Colour${i + 1}`);
    input.setAttribute('id', `colourName${i}`);
    const label = createWithClassAndAttr(
      'label',
      ['colour-value-label'],
      'for',
      `colourName${i}`
    );
    label.innerHTML = colours[i];
    label.style.background = colours[i];
    coloursContainer.append(input, label);
  }
  //coloursContainer.querySelector('input').focus();//focus on first input
};

const closeModalHandler=()=>{
  coloursContainer.innerHTML='';
  toggleBackdrop();
}
exportBtn.addEventListener('click', exportJSONHandler);
closeExportBtn.addEventListener('click', closeModalHandler);