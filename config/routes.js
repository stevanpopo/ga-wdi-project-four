const routes = require('express').Router();

const treatments = require('../controllers/treatments');

routes.route('/treatments')
  .get(treatments.index)
  .post(treatments.create);

routes.route('/treatments/:id')
  .get(treatments.show);

module.exports = routes;
