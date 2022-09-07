const showBtn = document.getElementById('show-saved-palette');
const paletteName = 'palette';

export const savePalette = (colours) => {
  localStorage.setItem(paletteName, JSON.stringify(colours)); //must be strings, and JSON is string in js
};
export const getSavedColours = () => {
  return JSON.parse(localStorage.getItem(paletteName));
};

showBtn.addEventListener('click', getSavedColours);
