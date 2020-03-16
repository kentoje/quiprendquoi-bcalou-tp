require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const fetch = require("node-fetch");
const app = express();
const port = process.env.PORT;

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Qui prend quoi ?',
  });
});

app.get('/party/:id', async (req, res) => {
  try {
    const data = await fetch(`${process.env.API_URL}/party/${req.params.id}`);
    const response = await data.json();
    const { name } = response;

    res.render('party', {
      party: response,
      title: name,
    });
  } catch (error) {
    res.send(error)
  }
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
    res.send(error)
  }
});

app.listen(port, _ => console.log(`Front app listening on port ${port}! At http://localhost:${port}`));
