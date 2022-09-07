import { lightenDarkenColor } from './mixcheckColours.js';
export const addNewColourLine = (evTarget, palette) => {
  let targetIdx;
  const currentPaletteColour = palette.paletteColours.find((el, idx) => {
    if (el.id === Number(evTarget.dataset.id)) {
      targetIdx = idx;
      return el;
    }
  });

  if (evTarget.dataset.trigger === 'right') {
    let nextPaletteColour;
    if (targetIdx === palette.paletteColours.length - 1) {
      nextPaletteColour = {
        rgbValue: lightenDarkenColor(currentPaletteColour.rgbValue, -70),
        id: 'last',
      };
      //obj on fly, to append if the new el should be pushed, add() expects nextPaletteColour.rgbValue
    } else {
      //
      nextPaletteColour = palette.paletteColours[targetIdx + 1];
    }

    palette.add(
      currentPaletteColour.rgbValue,
      nextPaletteColour.rgbValue,
      targetIdx + 1,
      nextPaletteColour.id
    );
  } else if (evTarget.dataset.trigger === 'left') {
    let prevPaletteColour;
    if (targetIdx === 0) {
      prevPaletteColour = {
        rgbValue: lightenDarkenColor(currentPaletteColour.rgbValue, 80),
        id: 'first',
      };
    } else {
      prevPaletteColour = palette.paletteColours[targetIdx - 1];
    }

    palette.add(
      prevPaletteColour.rgbValue, //will be mixed
      currentPaletteColour.rgbValue,
      targetIdx,
      currentPaletteColour.id
    );
  }
};
