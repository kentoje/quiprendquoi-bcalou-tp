const parties = require('../routes/parties');
const home = require('../routes/home');

module.exports = app => {
  app.use('/', home);
  app.use('/party', parties);
};