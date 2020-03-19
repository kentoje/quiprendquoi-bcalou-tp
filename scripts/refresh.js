/**
 * Ask user for permission.
 */
const askForPermission = _ => {
  Notification.requestPermission()
    .then(permission => permission)
    .catch(error => console.warn(error.message));
};

/**
 * Create a notification.
 * @param {String} title - Title displayed on notification.
 * @param {String} body - Text displayed on notification.
 */
const createNotification = (title, body) => (
  new Notification(title, { body })
);

if (location.pathname.match(/party/)) {
  const { pathname } = location;
  const api = 'http://bastiencalou.fr:3000';
  const route = pathname.match(/party/)[0];
  const id = pathname.match(/([^/]*)$/)[0];
  const time = 10000;
  const itemEl = document.querySelector('.items');
  let itemCount = document.querySelectorAll('.items li').length;
  let active = false;

  setInterval(_ => {
    fetch(`${api}/${route}/${id}`)
      .then(data => data.json())
      .then(result => {
        const { items } = result;
        const resultItemCount = items.length;

        if (itemCount !== resultItemCount) {
          itemEl.innerHTML = '';
          items.forEach((item, index) => {
          const newItem = `
            <li>
              <div class="items__info">
                <span>${item.name}</span>
                <span>${item.user}</span>
              </div>
              <form method="post" action="/${route}/${id}/items/${item._id}?_method=DELETE" class="items__remove">
                  <button type="submit">Supprimer cet item</button>
              </form>
              <form method="post" action="/${route}/${id}/items/${item._id}?_method=PATCH" class="items__edit">
                  <div>
                    <label for="name-${index}">Nom de l'item</label>
                    <input name="name" id="name-${index}" type="text" minlength="3" placeholder="${item.name}">
                  </div>
                  <div>
                    <label for="user-${index}">Nom de l'auteur</label>
                    <input name="user" id="user-${index}" type="text" minlength="3" placeholder="${item.user}">
                  </div>
                  <button type="submit">Modifier l'item</button>
                </form>
            </li>
          `;
          itemEl.innerHTML += newItem;
          });
          const title = 'Nouvelle(s) notification(s) !';
          const bodyText = 'De nouvelles notifications sont arrivées !';
          itemCount = document.querySelectorAll('.items li').length;
          createNotification(title, bodyText);
        }
      });
  }, time);

  document.body.addEventListener('click', _ => {
    if (!active) {
      ('Notification' in window) ? askForPermission() : console.warn('Notifications not supported...');
      active = true;
    }
  });
}
