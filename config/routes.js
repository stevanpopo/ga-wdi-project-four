const routes = require('express').Router();

const treatment = require('../controllers/treatments');

routes.route('/treatments')
  .get(treatment.index);

module.exports = routes;
