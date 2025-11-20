const routes = require('express').Router();
routes.use('/', require('./swagger'));

routes.get('/', (req, res) => {
// #swagger.tags = ['Home']
  res.send('Welcome to the Home Page!');
});

routes.use('/contacts', require('./contacts'));

module.exports = routes;