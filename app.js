const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('yo');
});

app.listen(port, _ => console.log(`Front app listening on port ${port}! At http://localhost:${port}`));
