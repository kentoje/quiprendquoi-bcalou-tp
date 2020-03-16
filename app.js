require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
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

app.post('/party', (req, res) => {
  res.send('POST ok');
});

app.listen(port, _ => console.log(`Front app listening on port ${port}! At http://localhost:${port}`));
