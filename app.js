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

    const result = await data.json();
    console.log(result)
  } catch (error) {
    console.error(error.message)
  }
});

app.listen(port, _ => console.log(`Front app listening on port ${port}! At http://localhost:${port}`));
