require('dotenv').config()

const express = require('express');
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('yo');
});

app.listen(port, _ => console.log(`Front app listening on port ${port}! At http://localhost:${port}`));
