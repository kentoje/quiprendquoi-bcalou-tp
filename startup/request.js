const bodyParser = require('body-parser');
const methodOverride = require('method-override');

module.exports = app => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride('_method'));
};
