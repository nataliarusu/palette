import { colourTone } from '../UI/constants.js';
const onhoverDomContainer = document.querySelector('.onhover-line-container');
const addNewLineDomEl = onhoverDomContainer.querySelector('.add-line-btn');

function barMouseoverEventHandler(ev) {
  const targetPosition = ev.target.getBoundingClientRect();
  const barWidth = targetPosition.width;
  onhoverDomContainer.style.width = targetPosition.width * 2 + 'px';
  onhoverDomContainer.style.height = targetPosition.height * 0.6 + 'px';

  if (ev.target.dataset.barposition === 'left') {
    onhoverDomContainer.style.left = targetPosition.left - barWidth + 'px';
  } else {
    onhoverDomContainer.style.left = targetPosition.right - barWidth + 'px';
  }

  onhoverDomContainer.style.top = `${targetPosition.top + window.scrollY}px`;
  onhoverDomContainer.classList.add('front');

  addNewLineDomEl.setAttribute('data-id', ev.target.closest('li').id);
  addNewLineDomEl.setAttribute('data-trigger', ev.target.dataset.barposition);
  onhoverDomContainer.addEventListener('mouseleave', barMouseLeaveEvent);
}
function barMouseLeaveEvent(ev) {
  onhoverDomContainer.classList.remove('front');
}

export function addColourGeneratorBarsListeners(elem) {
  /*elem.addEventListener('click', hoverListener.addLine);*/
  elem.addEventListener('mouseover', barMouseoverEventHandler);
}

/*only with opacity it doesn't work on onhoverDomContainer because mouse hover won't work 
if I hover again to the bar element, it is invisible
but onhoverDomContainer layer is on the bar! so I went with z-index
mouseover works on bars but mouseleave on onhoverDomContainer because 
if I do mouseleave on bar on the border of bar triggers mouseleave event*/

/**
 *
 * @param {* parentEl} el
 * @param {* string} colourtone
 */
export function updateInfoBtnsColour(li, colourtone) {
  const spans = li.querySelectorAll('.material-icons');
  const info = li.querySelector('.colour-generator--info');
  if (colourtone === colourTone.dark) {
    spans.forEach(
      (el) => (el.style.color = 'white')
    ); /**spans.forEach(el=> el.style.filter='invert(100)'); */
    info.style.color = 'white'; /** info.style.filter='invert(100)'; */
  } else {
    spans.forEach((el) => (el.style.color = 'black'));
    info.style.color = 'black';
  }
}
