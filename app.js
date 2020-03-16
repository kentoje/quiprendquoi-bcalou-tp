require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Qui prend quoi ?',
  });
});

app.listen(port, _ => console.log(`Front app listening on port ${port}! At http://localhost:${port}`));
