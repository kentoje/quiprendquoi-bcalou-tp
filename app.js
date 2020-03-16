require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const fetch = require("node-fetch");
const methodOverride = require('method-override');
const app = express();
const port = process.env.PORT;

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Qui prend quoi ?',
  });
});

app.post('/party', async (req, res) => {
  try {
    const data = await fetch(`${process.env.API_URL}/party`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });

    const { _id } = await data.json();
    res.redirect(`/party/${_id}`);
  } catch (error) {
    res.send(error);
  }
});

app.get('/party/:id', async (req, res) => {
  try {
    const data = await fetch(`${process.env.API_URL}/party/${req.params.id}`);
    const response = await data.json();
    const { name, _id } = response;

    res.render('party', {
      party: response,
      title: name,
      url: `${process.env.FRONT_URL}:${process.env.PORT}/party/${_id}`,
    });
  } catch (error) {
    res.send(error);
  }
});

app.delete('/party/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const data = await fetch(`${process.env.API_URL}/party/${id}`, {
      method: 'DELETE',
    });
    await data.json();
    res.redirect('/');
  } catch (error) {
    res.send(error);
  }
});

app.patch('/party/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const data = await fetch(`${process.env.API_URL}/party/${id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });
    await data.json();
    res.redirect('back');
  } catch (error) {
    res.send(error);
  }
});

app.post('/party/:id/items', async (req, res) => {
  try {
    const data = await fetch(`${process.env.API_URL}/party/${req.params.id}/items`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });

    await data.json();
    res.redirect('back');
  } catch (error) {
    res.send(error);
  }
});

app.delete('/party/:id/items/:itemId', async (req, res) => {
  const { id, itemId } = req.params;

  try {
    const data = await fetch(`${process.env.API_URL}/party/${id}/items/${itemId}`, {
      method: 'DELETE',
    });
    await data.json();
    res.redirect('back');
  } catch (error) {
    res.send(error);
  }
});

app.patch('/party/:id/items/:itemId', async (req, res) => {
  const { id, itemId } = req.params;

  try {
    const data = await fetch(`${process.env.API_URL}/party/${id}/items/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });
    await data.json();
    res.redirect('back');
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, _ => console.log(`Front app listening on port ${port}! At ${process.env.FRONT_URL}:${port}`));
