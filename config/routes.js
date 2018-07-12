const routes = require('express').Router();

const treatments = require('../controllers/treatments');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');

routes.route('/treatments')
  .get(treatments.index)
  .post(secureRoute, treatments.create);

routes.route('/treatments/:id')
  .get(treatments.show)
  .put(secureRoute, treatments.update)
  .delete(secureRoute, treatments.delete);

routes.route('/register')
  .post(auth.register);

routes.route('/login')
  .post(auth.login);

module.exports = routes;
