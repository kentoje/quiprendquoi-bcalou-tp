/**
 * @param {String} data - Data attribute of an element.
 */
const appendCopyButton = data => {
  const clipboards = document.querySelectorAll(data);
  clipboards.forEach(clipboard => {
    const button = document.createElement('button');
    button.innerHTML = 'Copier';
    clipboard.parentNode.append(button);
    copyOnClick(button, 'share')
  })
}

/**
 * @param {HTMLElement} element - Element to interact with.
 * @param {String} parentClass - Class of parent element.
 */
const copyOnClick = (element, parentClass) => {
  element.addEventListener('click', event => {
    const parent = event.composedPath().find(item => item.classList.contains(parentClass));
    const text = parent.querySelector('input[data-clipboard]').value;
    navigator.clipboard.writeText(text)
      .then(_ => {
        element.innerHTML = 'Copié !';
        console.log('Copié dans le presse papier !');
        setTimeout(_ => (element.innerHTML = 'Copier'), 2000);
      })
      .catch(error => console.error(error.message));
  });
}

navigator.clipboard ? appendCopyButton('[data-clipboard]') : console.warn('Pas de support du presse papier...');
