const express = require('express');
const app = express();

app.use(express.static('public'));
require('dotenv').config();
require('./startup/view')(app);
require('./startup/request')(app);
require('./startup/routes')(app);

const port = process.env.PORT;
app.listen(port, _ => console.log(`Front app listening on port ${port}! At ${process.env.FRONT_URL}:${port}`));
