/**
 *
 * @param {*string htmlEl } el
 * @param {*array of strings } classes className
 * @param {*string } attr
 * @param {*} attrValue
 * @returns element with classes and attr
 */
export function createWithClassAndAttr(el, classes, attr, attrValue) {
  const elem = document.createElement(el);
  if (classes.lengh === 1) {
    elem.classList.add(classes[0]);
  } else {
    for (const className of classes) {
      elem.classList.add(className);
    }
  }

  elem.setAttribute(attr, attrValue);
  return elem;
}
/**
 *
 * @param {* string} el
 * @param {* string} className
 * @returns
 */
export function createWithClass(el, className) {
  const elem = document.createElement(el);
  elem.classList.add(className);
  return elem;
}
/**
 * @param {* string} content span content conform google rules
 * @returns span content google icon
 */
export function createIcon(content) {
  const span = createWithClass('span', 'material-icons');
  span.innerHTML = content;
  return span;
}
