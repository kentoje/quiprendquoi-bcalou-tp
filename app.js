const express = require('express');
const app = express();
const port = process.env.PORT;

require('dotenv').config();
require('./startup/static')(app);
require('./startup/view')(app);
require('./startup/request')(app);
require('./startup/routes')(app);

app.listen(port, _ => console.log(`Front app listening on port ${port}! At ${process.env.FRONT_URL}:${port}`));
