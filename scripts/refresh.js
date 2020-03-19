if (location.pathname.match(/party/)) {
  const { pathname } = location;
  const api = 'http://bastiencalou.fr:3000';
  const route = pathname.match(/party/)[0];
  const id = pathname.match(/([^/]*)$/)[0];
  const time = 10000;
  const itemEl = document.querySelector('.items');
  const itemCount = document.querySelectorAll('.items li').length;

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
              <span>${item.name}</span>
              <br>
              <span>${item.user}</span>
              <form method="post" action="/${route}/${id}/items/${item._id}?_method=DELETE">
                  <button type="submit">Supprimer cet item</button>
              </form>
              <form method="post" action="/${route}/${id}/items/${item._id}?_method=PATCH">
                  <label for="name-${index}">Nom de l'item</label>
                  <br>
                  <input name="name" id="name-${index}" type="text" minlength="3" placeholder="${item.name}">
                  <br>
                  <label for="user-${index}">Nom de l'auteur</label>
                  <br>
                  <input name="user" id="user-${index}" type="text" minlength="3" placeholder="${item.user}">
                  <br>
                  <button type="submit">Modifier l'item</button>
                  </form>
            </li>
          `;
          itemEl.innerHTML += newItem;
          });
        }
      });
  }, time);
}
