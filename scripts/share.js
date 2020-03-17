/**
 * Append a share button on dedicated elements.
 * @param {String} data - Data attribute of an element.
 */
const appendShareButtons = data => {
  const shareables = document.querySelectorAll(data);
  const button = document.createElement('button');
  button.innerHTML = 'Partager';
  shareables.forEach(shareable => {
    const shareObject = createShareObject(shareable);
    shareable.parentNode.append(button);
    shareOnClick(button, shareObject);
  })
};

/**
 * On click on an element, it will provide a share dropdown menu
 * @param {HTMLElement} element - HTML Element.
 * @param {Object} objectEl - Object containing needed information to provide share dropdown.
 */
const shareOnClick = (element, objectEl) => {
  element.addEventListener('click', _ => {
    navigator.share(objectEl)
      .then(_ => console.log('Partagé !'))
      .catch(error => console.error(error.message));
  });
}

/**
 * Create an object containing needed informations to use navigator.share().
 * @param {HTMLElement} element - HTML Element.
 * returns {Object}
 */
const createShareObject = element => {
  const { shareUrl, shareTitle, shareText } = element.dataset;
  return {
    title: shareTitle,
    text: shareText,
    url: shareUrl,
  };
};

navigator.share ? appendShareButtons('[data-share-url]') : console.warn('Pas de support du partage...');